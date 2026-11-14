// Papa Parse example: read a file in chunks with the chunk callback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Read a file chunk by chunk',
  summary:
    'For a file, Papa reads a slice at a time instead of the whole thing. Give it a chunk callback and it hands you the rows of each slice as they are parsed. A row cut in two by a slice boundary is stitched back together for you.',
  section: 'Parse config',
  tags: ['chunk', 'chunkSize', 'File', 'parser.pause', 'parser.resume'],
  docs: ['repo/docs/docs.html', 'repo/docs/faq.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
