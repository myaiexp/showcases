// ky example: the six body shortcuts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Six ways to read an answer',
  summary:
    'A server\'s answer is just bytes, and your code wants it as an object, a string, a file or raw numbers. Ky lets you ask for the shape you need by chaining .json(), .text(), .blob(), .arrayBuffer(), .bytes() or .formData() onto the call. Read the same answer each way and compare what your code gets.',
  section: 'Requests',
  tags: ['.json()', '.text()', '.blob()', '.arrayBuffer()', '.bytes()', '.formData()'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
