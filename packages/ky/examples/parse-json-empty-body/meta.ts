// ky example: parseJson handles an empty body with a default
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An empty answer is not an error',
  summary:
    'Calling .json() on an answer with no text throws, because nothing can be parsed. If your server sends an empty body when there is nothing to list, a parseJson function can return a default such as an empty list, so the rest of your code never needs a special case.',
  section: 'JSON',
  tags: ['parseJson', 'empty body', '.json()'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
