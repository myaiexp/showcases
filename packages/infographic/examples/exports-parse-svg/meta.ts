// AntV Infographic example: Exports: parseSVG() turns a string into an element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: parseSVG() turns a string into an element",
  summary:
    "parseSVG(string) parses an SVG string into a DOM element you can append, restyle or measure, and returns null for text it cannot parse. The card parses three strings, sets the width and height on the result, appends it, and reports the element's tag and viewBox; the last string is not an svg at all.",
  section: "Exports",
  tags: ["parseSVG", "SVGSVGElement"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
