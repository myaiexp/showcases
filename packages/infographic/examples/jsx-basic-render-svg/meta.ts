// AntV Infographic example: a JSX component rendered with renderSVG()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSX: a component rendered to an SVG string',
  summary:
    'The JSX page’s first example: with the /** @jsxImportSource @antv/infographic */ pragma, a Node component made of Group, Rect and Text renders to an SVG string with renderSVG(). The full view prints the string beside the drawing; the viewBox is computed from the shapes’ bounds.',
  section: 'JSX primitives',
  tags: ['jsx', 'renderSVG', 'jsxImportSource', 'Rect', 'Text', 'Group', 'parseSVG'],
  docs: ['repo/site/src/content/reference/jsx.en.md', 'repo/site/src/content/reference/jsx-utils.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
