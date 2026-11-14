// css-doodle example: Descendants of a cell
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Descendants of a cell",
  summary:
    "Anything that does not start with a colon becomes a descendant, so i { } styles the element that @content: @raw(<i>…</i>) put in every cell. Each number blinks in turn.",
  section: "Selectors",
  tags: ['nesting', '@content', '@raw', '& span'],
  docs: [
    'pages/css-doodle-com/reference/selector-nesting.md',
    'pages/css-doodle-com/reference/property-content.md',
    'pages/css-doodle-com/reference/function-raw.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
