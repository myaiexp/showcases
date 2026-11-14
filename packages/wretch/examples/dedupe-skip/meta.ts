// Some requests are never merged: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Some requests are never merged',
  summary:
    'Merging identical requests is right for reads but wrong for writes: three "like" clicks must count three times. By default dedupe() skips anything that is not a GET, and any single request can opt out with skipDedupe. Three buttons show merged GETs, unmerged POSTs and unmerged GETs, with the numbers the server handed back.',
  section: 'Middlewares',
  tags: ['dedupe', 'skip', 'skipDedupe', 'middlewares'],
  docs: ['repo/src/middlewares/dedupe.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
