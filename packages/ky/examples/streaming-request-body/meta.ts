// ky example: streaming-request-body
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Send a stream as the body',
  summary:
    'A big recording does not have to exist in full before you can send it. Pass a ReadableStream as the body and the file is made piece by piece while it travels, and Ky sets the duplex option the browser needs. Only some browsers can do this (Chrome and Edge yes, Firefox no): where it is missing, this example says so and sends the same bytes as one block.',
  section: 'Tips',
  tags: ['ReadableStream', 'body', 'duplex', 'request streams', 'Firefox', 'retry'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
