// parse-error-bodies example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Read the reason a request failed",
  summary:
    "The sign-up form fails three ways. Wretch normally keeps only the status; .customError() reads the server's JSON body into the error, so the form can show the real reason under the right field, and a stand-in message when the body is not JSON.",
  section: 'Recipes',
  tags: ['customError', 'catch', 'post'],
  docs: ['repo/RECIPES.md', 'repo/README.md', 'repo/src/resolver.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
