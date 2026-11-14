// ky example: baseUrl resolves relative inputs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'baseUrl: where short addresses lead',
  summary:
    'Typing the full address of your API on every call is tedious and error-prone. Set baseUrl once and write only the end of each address; Ky resolves it the way a browser resolves a link. Plain names and ./ extend the base, ../ steps up, and a leading slash jumps to the root of the site.',
  section: 'URLs',
  tags: ['baseUrl', 'URL resolution', 'ky.extend'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
