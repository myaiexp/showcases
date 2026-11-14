// ky example: replaceOption replaces headers instead of merging
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keep a login out of a public client',
  summary:
    'Extending a client normally merges headers, so a public client built from the app client would still send the login to a third party. Wrapping the new headers in replaceOption puts them in place of the inherited ones. Compare what the server receives in each case.',
  section: 'Instances',
  tags: ['replaceOption', 'ky.extend', 'headers', 'authorization'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
