// snake-to-camel example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Translate field names both ways",
  summary:
    "The server writes first_name, the app wants firstName. One client renames keys on the way out (a deferred step) and on the way in (a resolver), nested ones included, so the app only ever sees camelCase.",
  section: 'Recipes',
  tags: ['defer', 'resolve', 'json', 'body'],
  docs: ['repo/RECIPES.md', 'repo/src/core.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
