// ky example: invalid options reject the promise
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bad options fail before sending',
  summary:
    'A typo in an option, such as a negative timeout or a retry count of -1, would be easy to miss. Ky checks every option before it sends anything and rejects the promise with a clear error, the same way fetch reports problems, so you handle one kind of failure. Try the bad options and watch that no request leaves the page.',
  section: 'Requests',
  tags: ['retry', 'timeout', 'TypeError', 'RangeError', 'validation'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
