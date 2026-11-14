// ky example: which error statuses Ky retries by default
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which errors get retried',
  summary:
    'Some errors pass: a busy or crashed server (500, 503) may be fine in a moment. Others will never change, such as "not found" (404) or "not logged in" (401). Ky retries only the first kind, so pick an answer and see whether the timeline grows a second attempt.',
  section: 'Retry',
  tags: ['retry.statusCodes', '404', '503', '429', '413'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
