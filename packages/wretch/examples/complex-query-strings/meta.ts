// complex-query-strings example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arrays and sorting in the query",
  summary:
    "A posts page picks authors, a page size and a sort order. A list becomes one userId=\u2026 piece per item and the rest are plain pieces. Change the choices and watch the address and the list follow.",
  section: 'Recipes',
  tags: ['query', 'arrays', 'QueryStringAddon', 'get'],
  docs: ['repo/RECIPES.md', 'repo/src/addons/queryString.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
