// deck-gl example: Layer id matching
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer id matching",
  summary:
    "Moves 60 points with a getPosition transition: a stable id carries layer state forward so they glide, a new id each update rebuilds the layer and they jump.",
  section: "Using layers",
  tags: ["id", "transitions", "getPosition", "layer lifecycle"],
  docs: ["repo/docs/developer-guide/using-layers.md", "repo/docs/api-reference/core/layer.md", "repo/docs/developer-guide/animations-and-transitions.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
