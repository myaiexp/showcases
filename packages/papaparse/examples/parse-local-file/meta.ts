// Papa Parse example: parse a file from the reader's own computer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Parse a file from your computer',
  summary:
    'Hand Papa a File from a file picker and it reads it right in the browser: nothing is uploaded. The rows arrive in the complete callback, with the file. Try one of your own.',
  section: 'Convert CSV to JSON',
  tags: ['Papa.parse', 'File', 'complete', 'privacy'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html', 'repo/docs/faq.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
