// Papa Parse example: naming the delimiter when the guess is ambiguous
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Name the separator yourself',
  summary:
    'A price list uses semicolons between columns and commas as decimal points. Papa has to guess, and with only two columns the commas look just as good. Pass delimiter and it stops guessing.',
  section: 'Parse config',
  tags: ['delimiter', 'meta.delimiter', 'auto-detect'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
