// Drop cached entries after a change: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drop cached entries after a change',
  summary:
    'A to-do list is cached, then a new item is added. Without help the cache keeps serving the old list and the new item never shows up. With an invalidate function, the POST that adds the item also throws away the cached list, so the next read fetches the real one. Tick the box to compare.',
  section: 'Middlewares',
  tags: ['throttlingCache', 'invalidate', 'middlewares'],
  docs: ['repo/src/middlewares/throttlingCache.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
