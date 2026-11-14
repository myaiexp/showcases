// css-doodle example: @even: a checkerboard
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@even: a checkerboard",
  summary:
    "A checkerboard rather than index parity: on a 5-wide grid it is the even indexes, but on a 4-wide grid the selected indexes alternate between even and odd from row to row.",
  section: "Selectors",
  tags: ['@even', '@nth', 'checkerboard'],
  docs: [
    'pages/css-doodle-com/reference/selector-even.md',
    'pages/css-doodle-com/reference/selector-nth.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
