// AntV Infographic example: JSX utilities: renderSVG options for the viewBox
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSX utilities: renderSVG options for the viewBox',
  summary:
    'renderSVG(node, options) writes the attributes of the outer svg. With no options the viewBox fits the drawn bounds exactly, width and height set a viewBox of that size, an explicit viewBox crops or pads, and style adds CSS. The panel shows the options and the svg tag of each step.',
  section: 'JSX utilities',
  tags: ['renderSVG', 'viewBox', 'width', 'height', 'style', 'SVGProps'],
  docs: [
    'repo/site/src/content/reference/jsx-utils.en.md',
    'repo/site/src/content/reference/jsx.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
