// AntV Infographic example: Infographic API: toDataURL() as PNG with dpr
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Infographic API: toDataURL() as PNG with dpr",
  summary:
    "toDataURL() with no options, or { type: 'png', dpr }, resolves to a PNG data: URL; dpr is the device pixel ratio the bitmap is drawn at. The img beside the drawing shows each result and the caption reports its pixel size. The card exports at dpr 1, 2 and 3.",
  section: "Infographic API",
  tags: ["toDataURL", "PNGExportOptions", "dpr", "removeBackground"],
  docs: ["repo/site/src/content/reference/infographic-api.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
