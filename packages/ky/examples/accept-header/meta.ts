// ky example: the Accept header follows the body shortcut
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ky says what format you want',
  summary:
    'Servers can often answer in more than one format (data, text, a spreadsheet), and they choose by reading the Accept header. When you chain .json(), .text() or .formData() onto a call, Ky adds the matching Accept header for you; a header you set yourself always wins. Try each call and see what the server received.',
  section: 'Requests',
  tags: ['accept', '.json()', '.text()', '.formData()', 'headers'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
