// css-doodle example: @media and other group rules
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@media and other group rules",
  summary:
    "@media, @supports, @container, @layer, @scope and @starting-style wrap their contents like CSS does. Here a motion query guards the animation, a colour-scheme query recolours cells and a hover query adds a hover colour.",
  section: "Selectors",
  tags: ['@media', 'prefers-reduced-motion', ':hover'],
  docs: [
    'pages/css-doodle-com/reference/selector-at-rules.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
