// Tell cached answers apart: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tell cached answers apart',
  summary:
    'An answer that comes from the cache looks exactly like one from the server, unless you ask. flagResponseOnCacheHit gives cached responses a property of your chosen name, so the app can mark them. Each post request below is listed as fresh or cached.',
  section: 'Middlewares',
  tags: ['throttlingCache', 'flagResponseOnCacheHit', 'res', 'middlewares'],
  docs: ['repo/src/middlewares/throttlingCache.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
