// css-doodle example: @keyframes inside a doodle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@keyframes inside a doodle",
  summary:
    "Functions inside @keyframes give each cell keyframes of its own, so every square spins its own way. When a cell rule declares keyframes without functions, every selected cell shares that one animation.",
  section: "Selectors",
  tags: ['@keyframes', '@r', '@p', '@cell'],
  docs: [
    'pages/css-doodle-com/reference/selector-at-rules.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
