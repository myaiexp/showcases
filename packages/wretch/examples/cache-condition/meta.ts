// Only cache good answers: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Only cache good answers',
  summary:
    'The server fails once, then recovers. The condition option decides whether an answer is worth remembering. With response.ok (the default) the 500 is forgotten and the next call gets the recovered answer; with a condition that accepts everything, the cache keeps serving the 500 to every caller.',
  section: 'Middlewares',
  tags: ['throttlingCache', 'condition', 'internalError', 'middlewares'],
  docs: ['repo/src/middlewares/throttlingCache.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
