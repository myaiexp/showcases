// deck-gl example: positionFormat XY and XYZ
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "positionFormat XY and XYZ",
  summary:
    "A PathLayer fed flat arrays of x, y pairs: positionFormat XY reads them right, the default XYZ regroups them into triples and scrambles the lines.",
  section: "Using layers",
  tags: ["positionFormat", "PathLayer", "getPath"],
  docs: ["repo/docs/api-reference/core/layer.md", "repo/docs/api-reference/layers/path-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
