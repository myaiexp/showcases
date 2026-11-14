// ky example: search params accumulate across extend layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Query settings add up across clients',
  summary:
    'When you extend a client that already sets search parameters, the new ones are added to the old, and a parameter with the same name takes the new value. If the child should start with a clean query, wrap them in replaceOption. The address each call reached shows the three outcomes.',
  section: 'Instances',
  tags: ['ky.extend', 'searchParams', 'replaceOption', 'query string'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
