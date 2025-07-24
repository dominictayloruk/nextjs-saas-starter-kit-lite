import { useMemo } from 'react';

import { getSupabaseBrowserClient } from '../clients/browser-client';
import { type Database } from '../database.types';

/**
 * @name useSupabase
 * @description Use Supabase in a React component
 */
export function useSupabase<Db = Database>() {
  return useMemo(() => getSupabaseBrowserClient<Db>(), []);
}
