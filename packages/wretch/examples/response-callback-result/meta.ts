// Callback return value example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The callback's return value is the result",
  summary:
    'Every response type accepts an optional callback, and whatever it returns is what the promise delivers. The same post comes back four times; only the callback differs, and so does what .then() receives.',
  section: 'Response types',
  tags: ['json'],
  docs: ['repo/README.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
