'use client';

import dynamic from 'next/dynamic';

import { ThemeProvider } from 'next-themes';

import { CaptchaProvider } from '@kit/auth/captcha/client';
import { If } from '@kit/ui/if';
import { VersionUpdater } from '@kit/ui/version-updater';

import { AuthProvider } from '~/components/auth-provider';
import appConfig from '~/config/app.config';
import authConfig from '~/config/auth.config';
import featuresFlagConfig from '~/config/feature-flags.config';

import { ReactQueryProvider } from './react-query-provider';

const captchaSiteKey = authConfig.captchaTokenSiteKey;

const CaptchaTokenSetter = dynamic(async () => {
  if (!captchaSiteKey) {
    return Promise.resolve(() => null);
  }

  const { CaptchaTokenSetter } = await import('@kit/auth/captcha/client');

  return {
    default: CaptchaTokenSetter,
  };
});

export function RootProviders({
  lang: _lang,
  theme = appConfig.theme,
  children,
}: React.PropsWithChildren<{
  lang: string;
  theme?: string;
}>) {

  return (
    <ReactQueryProvider>
      {/* Temporarily disable I18nProvider to fix build issues */}
      {/* <I18nProvider settings={i18nSettings} resolver={i18nResolver}> */}
      <CaptchaProvider>
        <CaptchaTokenSetter siteKey={captchaSiteKey} />

        <AuthProvider>
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
            defaultTheme={theme}
            enableColorScheme={false}
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </CaptchaProvider>

      <If condition={featuresFlagConfig.enableVersionUpdater}>
        <VersionUpdater />
      </If>
      {/* </I18nProvider> */}
    </ReactQueryProvider>
  );
}
