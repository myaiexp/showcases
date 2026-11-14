// exponential-backoff example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Wait longer after each failure",
  summary:
    "A note save retries against a shaky server with a doubling wait. See it recover, give up after three retries, retry a 404 because until says only ok counts, and the recipe's own ramp, which never actually grows.",
  section: 'Recipes',
  tags: ['retry', 'delayRamp', 'onRetry', 'until', 'maxAttempts'],
  docs: ['repo/RECIPES.md', 'repo/src/middlewares/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
