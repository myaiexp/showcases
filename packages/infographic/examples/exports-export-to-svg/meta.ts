// AntV Infographic example: Exports: exportToSVG() returns a standalone SVG element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: exportToSVG() returns a standalone SVG element",
  summary:
    "exportToSVG(svgNode, options) clones a rendered SVG into a standalone element, inlining resources and optionally dropping the background, where toDataURL would give a string. The right pane shows the element it returns; the card exports with the background kept and then removed.",
  section: "Exports",
  tags: ["exportToSVG", "SVGExportOptions", "removeBackground", "embedResources"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md", "repo/site/src/content/reference/infographic-api.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
