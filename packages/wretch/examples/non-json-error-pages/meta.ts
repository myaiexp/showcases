// non-json-error-pages example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "When the error is an HTML page",
  summary:
    "Failures arrive as JSON, as an HTML error page, or as plain text. One .customError() handler looks at the Content-Type and reads each the right way, so an HTML page never gets fed to .json() or shown to the user.",
  section: 'Recipes',
  tags: ['customError', 'content-type', 'text', 'json'],
  docs: ['repo/RECIPES.md', 'repo/src/resolver.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
