// ky example: backoffLimit clamps the growing retry pause
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Backoff ceiling',
  summary:
    'Doubling pauses are fine for two or three retries, but by the sixth a user would wait half a minute. backoffLimit puts a ceiling on each pause, so the waits grow and then level off. Pick a ceiling and compare the gaps.',
  section: 'Retry',
  tags: ['retry.backoffLimit', 'backoff', 'delay'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
