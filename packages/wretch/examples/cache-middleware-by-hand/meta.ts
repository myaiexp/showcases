// A hand-written cache: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A hand-written cache',
  summary:
    'The README builds a throttling cache from scratch in about thirty lines: a Map of saved answers, a Map of calls waiting on an answer already on its way, and a set of requests whose "remember" window is open. Thirty calls for the same page go in as three waves; each dot is one call, coloured by how it was served: asked the server, waited for an answer already on its way, or served from memory. Only two real requests reach the server.',
  section: 'Writing a middleware',
  tags: ['middlewares', 'cache', 'throttle', 'context'],
  docs: ['repo/README.md', 'repo/src/middlewares/throttlingCache.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
