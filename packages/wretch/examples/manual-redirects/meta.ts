// manual-redirects example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Notice a redirect yourself",
  summary:
    "With redirect set to manual, a 301 or 302 is handed back instead of followed. A middleware reads its Location header and stops the request, and the app decides where to go. Nothing here leaves the page; it only shows the place.",
  section: 'Recipes',
  tags: ['options', 'redirect', 'middlewares', 'catcher'],
  docs: ['repo/RECIPES.md', 'repo/src/middleware.ts', 'repo/src/core.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
