// Stack middlewares: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack middlewares',
  summary:
    'Middlewares are layers around every request, and .middlewares([retry(), dedupe()]) puts several on at once. Three parts of the app ask for the same post while the server is flaky: dedupe merges the three asks into one request, retry repeats it after the 503, and all three callers get the good answer from just two requests.',
  section: 'Middlewares',
  tags: ['middlewares', 'retry', 'dedupe'],
  docs: ['repo/README.md', 'repo/src/middlewares/retry.ts', 'repo/src/middlewares/dedupe.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
