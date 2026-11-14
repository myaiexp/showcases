// Papa Parse example: the separator is detected, whatever it is
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Guess the separator',
  summary:
    '"But I don\'t know the delimiter…" That\'s okay. Leave the delimiter option out and Papa scans the text, picks comma, tab, pipe, semicolon or the record separator, and reports its choice in meta.delimiter.',
  section: 'Parse config',
  tags: ['delimiter', 'auto-detect', 'meta.delimiter', 'Papa.RECORD_SEP'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
