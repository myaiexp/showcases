// css-doodle example: @property inside a doodle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@property inside a doodle",
  summary:
    "Browsers ignore @property inside a shadow root, so css-doodle adds it to the page. Registered as an angle, --turn can animate in a conic gradient.",
  section: "Selectors",
  tags: ['@property', '@keyframes', 'conic-gradient'],
  docs: [
    'pages/css-doodle-com/reference/selector-at-rules.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
