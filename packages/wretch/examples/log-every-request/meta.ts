// log-every-request example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Log every request and answer",
  summary:
    "One logging middleware sits in front of every call and writes an arrow when a request leaves and a tick or a cross when it ends. Notice that a 404 still gets a tick: the cross is for requests that got no answer at all.",
  section: 'Recipes',
  tags: ['middlewares', 'logging', 'fetchPolyfill'],
  docs: ['repo/RECIPES.md', 'repo/src/middleware.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
