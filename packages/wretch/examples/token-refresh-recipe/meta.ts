// token-refresh-recipe example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Refresh an expired token automatically",
  summary:
    "The app starts with an expired token. The first call gets a 401, renews the token and replays itself; the next call already carries the new token, because .defer() reads the current one before every send. Watch the token and the refresh counter.",
  section: 'Recipes',
  tags: ['defer', 'resolve', 'unauthorized', 'basicAuth', 'fetch'],
  docs: ['repo/RECIPES.md', 'repo/src/core.ts', 'repo/src/addons/basicAuth.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
