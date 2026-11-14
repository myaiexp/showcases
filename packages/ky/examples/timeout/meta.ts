// ky example: the timeout option cancels a request that takes too long
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timeout',
  summary:
    'A slow server should not freeze your page for ever. Ky gives every request a clock (10 seconds by default); when it runs out, Ky cancels the request and throws a TimeoutError. Slide the timeout past the server\'s 1.7 s answer time to see the difference.',
  section: 'Timeouts and limits',
  tags: ['timeout', 'TimeoutError', 'abort'],
  docs: ['repo/readme.md', 'repo/source/errors/TimeoutError.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
