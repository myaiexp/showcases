// Papa Parse example: stream a file too big to hold, keeping only totals
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Total up a huge file without loading it',
  summary:
    'Can Papa parse a file with a million rows? Yes, by streaming: it reads a slice, hands you the rows, and forgets them. Keep only what you need, here a running total, and the file never has to fit in memory. The progress bar counts the bytes read.',
  section: 'FAQ',
  tags: ['chunk', 'chunkSize', 'File', 'streaming', 'parser.pause', 'parser.abort'],
  docs: ['repo/docs/faq.html', 'repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
