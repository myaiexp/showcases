// ky example: which HTTP statuses make Ky throw
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which answers count as errors',
  summary:
    'With plain fetch, a "404 Not Found" or "500 Server Error" arrives like any other answer and your code has to remember to check. Ky throws an HTTPError for every answer outside 200 to 299, so a failed request lands in your catch block. Ask the pretend server for different status codes and see which ones throw.',
  section: 'HTTP errors',
  tags: ['HTTPError', 'throwHttpErrors', 'status codes', 'catch'],
  docs: ['repo/readme.md', 'repo/source/errors/HTTPError.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
