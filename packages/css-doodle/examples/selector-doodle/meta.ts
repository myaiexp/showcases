// css-doodle example: :doodle: styling the component
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: ":doodle: styling the component",
  summary:
    "Top-level rules go to the cells, so :doodle is how a rule reaches the element itself. Here it carries the grid, an outline and rounded corners, while the cells inside shrink and grow.",
  section: "Selectors",
  tags: [':doodle', '@grid', 'outline'],
  docs: [
    'pages/css-doodle-com/reference/selector-doodle.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
