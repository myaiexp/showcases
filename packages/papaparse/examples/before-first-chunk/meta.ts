// Papa Parse example: beforeFirstChunk edits a file before it is parsed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fix the file before it is parsed',
  summary:
    'Exports often start with a title line or use header names you do not want. beforeFirstChunk gets the first piece of the file as text before Papa parses it, and whatever you return is what gets parsed. Strip a line, rename a column, then let Papa do the rest.',
  section: 'Parse config',
  tags: ['beforeFirstChunk', 'File', 'header'],
  docs: ['repo/docs/docs.html', 'repo/docs/faq.html', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
