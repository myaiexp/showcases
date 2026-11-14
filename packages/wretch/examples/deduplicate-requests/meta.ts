// deduplicate-requests example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Three components, one request",
  summary:
    "Three parts of a profile page need the same user and ask at the same moment. With dedupe() the server sees one request, and all three fill in. A part that opens after the answer is back has nothing to share, so it triggers a second request.",
  section: 'Recipes',
  tags: ['dedupe', 'middlewares', 'Promise.all'],
  docs: ['repo/RECIPES.md', 'repo/src/middlewares/dedupe.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
