// ky example: timeout while the body is being read
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timeout while reading the body',
  summary:
    'A server can answer "200 OK" right away and then dribble the data out so slowly that the page still hangs. Ky\'s shortcut methods (.json(), .text()) give the body the same timeout as a separate clock, so a trickle is cut off too. A body that times out is not retried, because the answer already arrived.',
  section: 'Timeouts and limits',
  tags: ['timeout', 'TimeoutError', '.json()', 'response body', 'streaming'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
