// Choose what gets cached: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Choose what gets cached',
  summary:
    'The cache remembers answers under a key, by default the method and address. Two calls to one address in different languages share that key, so the second reader gets the first reader\'s language. A custom key fixes it; the skipCache flag and the skip function keep chosen requests out of the cache altogether.',
  section: 'Middlewares',
  tags: ['throttlingCache', 'key', 'skip', 'skipCache', 'middlewares'],
  docs: ['repo/src/middlewares/throttlingCache.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
