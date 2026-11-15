// AntV Infographic example: Infographic API: toDataURL() as SVG
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Infographic API: toDataURL() as SVG",
  summary:
    "toDataURL({ type: 'svg' }) resolves to a data: URL of the rendered SVG, here shown as an img beside the live drawing. The full view toggles embedResources and removeBackground, the two SVG options, and shows the size of the URL. The card re-renders and re-exports with and without the background.",
  section: "Infographic API",
  tags: ["toDataURL", "ExportOptions", "SVGExportOptions", "embedResources", "removeBackground"],
  docs: ["repo/site/src/content/reference/infographic-api.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
