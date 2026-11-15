// css-doodle example: @content: text, SVG, nested doodle and raw HTML
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@content: text, SVG, nested doodle and raw HTML",
  summary:
    "@content is not the CSS content property: its value becomes real DOM. A string is text, @svg becomes an inline svg, @doodle a nested css-doodle, and @raw plain HTML.",
  section: "Properties",
  tags: ['@content', '@svg', '@doodle', '@raw'],
  docs: [
    'pages/css-doodle-com/reference/property-content.md',
    'pages/css-doodle-com/reference/function-svg.md',
    'pages/css-doodle-com/reference/function-doodle.md',
    'pages/css-doodle-com/reference/function-raw.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
