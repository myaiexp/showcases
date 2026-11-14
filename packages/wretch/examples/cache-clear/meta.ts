// Empty the whole cache: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Empty the whole cache',
  summary:
    'Three pages are fetched and remembered, then fetched again for free. When the user logs out, nothing cached for them should survive: the clear option spots the log-out request and empties the entire cache. A panel shows what the cache holds at each step, and the next reads go to the server again.',
  section: 'Middlewares',
  tags: ['throttlingCache', 'clear', 'cache', 'middlewares'],
  docs: ['repo/src/middlewares/throttlingCache.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
