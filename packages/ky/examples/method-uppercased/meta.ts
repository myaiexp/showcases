// ky example: standard method names are uppercased
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lower-case methods still work',
  summary:
    'Servers are picky about the spelling of a method: PATCH works, patch may be refused. The browser\'s fetch fixes some lower-case names but not all (patch is left as written). Ky uppercases all the standard ones for you, so method: \'patch\' arrives as PATCH.',
  section: 'Requests',
  tags: ['method', 'PATCH', 'uppercase'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
