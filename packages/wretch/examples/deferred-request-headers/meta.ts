// deferred-request-headers example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Headers computed right before sending",
  summary:
    "Two clients send the same call. One had its headers set when it was built; the other computes them with .defer() just before each send. Change the language and compare the language, the request id and the time they carry.",
  section: 'Recipes',
  tags: ['defer', 'headers', 'Accept-Language'],
  docs: ['repo/RECIPES.md', 'repo/src/core.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
