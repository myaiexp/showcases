// deck-gl example: ArcLayer source and target colours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ArcLayer source and target colours",
  summary:
    "Each arc blends from its own getSourceColor to its getTargetColor, picked by flights and by hemisphere.",
  section: 'Core layers',
  tags: ["ArcLayer","getSourceColor","getTargetColor","getWidth"],
  docs: ["repo/docs/api-reference/layers/arc-layer.md","repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
