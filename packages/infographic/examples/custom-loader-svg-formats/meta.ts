// AntV Infographic example: Custom resource loader: loadSVGResource with svg, symbol or junk
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom resource loader: loadSVGResource with svg, symbol or junk',
  summary:
    'loadSVGResource accepts an <svg> string or a <symbol> string and returns a symbol the infographic can draw, or null when the text is not SVG. The loader maps three names to those three cases, so the steps show an svg, a symbol, and a failed parse that falls through to the offline icons.',
  section: 'Custom resource loader',
  tags: ['loadSVGResource', 'registerResourceLoader', 'svg', 'symbol', 'null'],
  docs: [
    'repo/site/src/content/learn/custom-resource-loader.en.md',
    'repo/site/src/content/learn/resources.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
