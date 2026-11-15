// css-doodle example: @nth: cells by index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@nth: cells by index",
  summary:
    "@nth(5), @nth(3n + 8) and @nth(1, 2) pick cells by their index from 1; several arguments match any of them, and not inverts. odd and even here are index parity, not a checkerboard.",
  section: "Selectors",
  tags: ['@nth', 'an+b', 'odd', 'even', 'not'],
  docs: [
    'pages/css-doodle-com/reference/selector-nth.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
