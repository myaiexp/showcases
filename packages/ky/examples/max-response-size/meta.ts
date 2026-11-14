// ky example: maxResponseSize cancels an oversized download
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Maximum response size',
  summary:
    'An address that suddenly returns a huge file can eat the memory of your visitor\'s browser. maxResponseSize tells Ky how many bytes you will accept: once the download crosses that line Ky cancels it and throws a ResponseSizeError. The red line on the meter is the limit.',
  section: 'Timeouts and limits',
  tags: ['maxResponseSize', 'ResponseSizeError', 'download', 'memory'],
  docs: ['repo/readme.md', 'repo/source/errors/ResponseSizeError.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
