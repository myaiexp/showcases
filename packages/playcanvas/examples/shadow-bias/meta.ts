// playcanvas example: Shadow bias and intensity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shadow bias and intensity",
  summary:
    "A low sun over a coarse shadow map, where acne appears at zero bias and shadows detach from their casters when the bias is too large. normalOffsetBias fixes acne with less detaching; shadowIntensity fades the shadows.",
  section: "Graphics: Lighting",
  tags: ["shadowBias","normalOffsetBias","shadowIntensity","shadowResolution"],
  docs: ["repo/docs/user-manual/graphics/lighting/shadows.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
