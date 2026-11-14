// deck-gl example: Layer parameters: blending and depth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer parameters: blending and depth",
  summary:
    "The parameters prop sets GPU state for one layer: additive blending with a glow of overlapping translucent discs, with or without depth writes.",
  section: "Using layers",
  tags: ["parameters", "blend", "depthWriteEnabled", "luma.gl"],
  docs: ["repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
