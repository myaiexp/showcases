// css-doodle example: Grid scale, translate and enlarge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grid scale, translate and enlarge",
  summary:
    "Three modifiers move the container that holds the cells: + scales it, ~ translates it, and ^ changes its width and height so that fonts and borders inside keep their size. Each is a shortcut for the equivalent CSS on :container.",
  section: "Properties",
  tags: ['@grid', '+ scale', '~ translate', '^ enlarge', ':container'],
  docs: [
    'pages/css-doodle-com/reference/property-grid.md',
    'pages/css-doodle-com/reference/selector-container.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
