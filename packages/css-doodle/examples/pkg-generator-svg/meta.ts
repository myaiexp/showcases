// css-doodle/generator svg(): markup from @svg code, no doodle needed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'svg(): SVG markup without a doodle',
  summary:
    'svg(code, { seed }) from css-doodle/generator runs the same code as @svg() and returns the SVG as a string, here five random circles from the docs\' example, shown as text beside the picture that svg.element() made from it. The seed steps up every few seconds.',
  section: 'Package exports',
  tags: ['css-doodle/generator', 'svg()', 'svg.element()', 'seed'],
  docs: ['pages/css-doodle-com/reference/js-api-svg.md', 'pages/css-doodle-com/reference/js-api-modules.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
