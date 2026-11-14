// accepted-202 example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treat \"accepted, still working\" specially",
  summary:
    "A 202 means accepted, not finished. Wretch counts it as a success, so a small middleware turns it into an AcceptedError and .catcher() answers with a processing status, and the app can show a waiting message until the real result is ready.",
  section: 'Recipes',
  tags: ['catcher', 'middlewares', '202', 'AcceptedError'],
  docs: ['repo/RECIPES.md', 'repo/src/resolver.ts', 'repo/src/middleware.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
