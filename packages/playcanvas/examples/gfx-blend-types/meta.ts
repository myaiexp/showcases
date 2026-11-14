// PlayCanvas example: Alpha blending and blend state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Alpha blending and blend state",
  summary:
    "Three overlapping translucent quads over a striped backdrop, with blendType cycling through the presets in cards. The full view picks any preset, sets opacity and can assign a hand-written BlendState instead.",
  section: "Graphics",
  tags: ["StandardMaterial", "blendType", "BLEND_NORMAL", "BLEND_ADDITIVE", "BLEND_MULTIPLICATIVE", "BLEND_PREMULTIPLIED", "BlendState", "blendState", "opacity"],
  docs: ["repo/docs/user-manual/graphics/transparency.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
