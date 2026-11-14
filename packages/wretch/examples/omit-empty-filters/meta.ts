// omit-empty-filters example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Leave empty filters out of the address",
  summary:
    "A search page with optional filters. Left empty, they still end up in the address (id=, title=) and the server tries to match them, finding nothing. With omitUndefinedOrNullValues the empty ones stay out.",
  section: 'Recipes',
  tags: ['query', 'omitUndefinedOrNullValues', 'QueryStringAddon'],
  docs: ['repo/RECIPES.md', 'repo/src/addons/queryString.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
