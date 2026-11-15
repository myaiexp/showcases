// AntV Infographic example: Infographic API: compose() builds the SVG template
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Infographic API: compose() builds the SVG template",
  summary:
    "compose() turns parsed options into the SVG template (an SVGSVGElement) without drawing it into the container; render() normally does this step. Here the left pane is render() and the right pane is compose() on the same parsed options, appended by hand; the card changes the title between the two and both follow.",
  section: "Infographic API",
  tags: ["compose", "ParsedInfographicOptions", "SVGSVGElement"],
  docs: ["repo/site/src/content/reference/infographic-api.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
