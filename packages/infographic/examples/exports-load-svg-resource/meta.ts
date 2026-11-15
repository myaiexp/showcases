// AntV Infographic example: Exports: loadSVGResource() makes a symbol
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: loadSVGResource() makes a symbol",
  summary:
    "loadSVGResource(svgString) parses an svg (or symbol) string into a reusable SVGSymbolElement, which is what a resource loader must return. The card loads three strings, shows the symbol's markup, and draws it through a use element at three sizes, to show one symbol serving many places.",
  section: "Exports",
  tags: ["loadSVGResource", "SVGSymbolElement", "ResourceConfig"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md", "repo/site/src/content/reference/infographic-types.en.md", "repo/site/src/content/learn/resources.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
