// css-doodle example: @cell: dr, the distance from the centre
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@cell: dr, the distance from the centre",
  summary:
    "Expressions work inside @cell as in @match: dr is the distance from the centre in cells, so one rule paints a disc and another the ring from 5 to 6. Variants widen them.",
  section: "Selectors",
  tags: ['@cell', 'dr', 'expression'],
  docs: [
    'pages/css-doodle-com/reference/selector-cell.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
