// validate-with-zod example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Check the answer's shape with Zod",
  summary:
    "The answer is checked against a Zod schema inside .json(). A well-formed user passes; a broken one is rejected with Zod's own messages, naming each field that is wrong, before the app can use it.",
  section: 'Recipes',
  tags: ['json', 'zod', 'schema', 'parse'],
  docs: ['repo/RECIPES.md', 'repo/src/resolver.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
