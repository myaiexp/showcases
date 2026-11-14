// replay-after-refresh example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Replay a failed request after logging in again",
  summary:
    "A 401 catcher refreshes the password and replays the call. What the replay returns replaces what the caller asked for, so one catcher that always replays as JSON hands an object to a caller who wanted text. A replay per call fixes it.",
  section: 'Recipes',
  tags: ['catcher', 'unauthorized', 'basicAuth', 'fetch', 'text'],
  docs: ['repo/RECIPES.md', 'repo/src/core.ts', 'repo/src/addons/basicAuth.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
