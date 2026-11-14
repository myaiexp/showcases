// global-timeout example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A default timeout for every request",
  summary:
    "A dashboard loads three widgets at once. The client gives every request 500 ms by default, so the forecast is cut off, while the report asks for 1000 ms on its own call and makes it. Move the slider to change how slow they are.",
  section: 'Recipes',
  tags: ['setTimeout', 'resolve', 'onAbort', 'AbortAddon'],
  docs: ['repo/RECIPES.md', 'repo/src/addons/abort.ts', 'repo/src/core.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
