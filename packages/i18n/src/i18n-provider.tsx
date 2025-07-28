'use client';

import { useEffect, useState } from 'react';
import { type InitOptions, type i18n } from 'i18next';

import { initializeI18nClient } from './i18n.client';

let i18nInstance: i18n;

type Resolver = (
  lang: string,
  namespace: string,
) => Promise<Record<string, string>>;

export function I18nProvider({
  settings,
  children,
  resolver,
}: React.PropsWithChildren<{
  settings: InitOptions;
  resolver: Resolver;
}>) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeI18n = async () => {
      try {
        // Check if we need to reinitialize
        if (
          !i18nInstance ||
          i18nInstance.language !== settings.lng ||
          i18nInstance.options.ns?.length !== settings.ns?.length
        ) {
          i18nInstance = await initializeI18nClient(settings, resolver);
        }
        
        if (isMounted) {
          setIsInitialized(true);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to initialize i18n'));
        }
      }
    };

    initializeI18n();

    return () => {
      isMounted = false;
    };
  }, [settings.lng, settings.ns, resolver]);

  if (error) {
    console.error('I18n initialization error:', error);
    // Return children anyway to prevent complete app crash
    return children;
  }

  if (!isInitialized) {
    // Show loading state or return children to prevent blocking
    return children;
  }

  return children;
}

/**
 * @name useI18nClient
 * @description A hook that returns the initialized i18n client.
 */
export function useI18nClient() {
  return i18nInstance;
}
