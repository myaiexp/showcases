// css-doodle example: :container: transform or switch to flexbox
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: ":container: transform or switch to flexbox",
  summary:
    "Rules on :container reach the element that holds the cells: a rotation and scale turn the whole grid while the host stays put, and display: flex turns the cells into flex items.",
  section: "Selectors",
  tags: [':container', 'transform', 'flex', '@iI'],
  docs: [
    'pages/css-doodle-com/reference/selector-container.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
