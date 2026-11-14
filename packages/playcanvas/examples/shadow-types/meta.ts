// playcanvas example: Shadow types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shadow types",
  summary:
    "The same directional light under PCF 1x1, 3x3 and 5x5, variance shadow maps (16 and 32 bit) and PCSS, on a box that touches the floor and a ball hovering above it. The full view tunes the VSM blur and the PCSS penumbra and sample counts.",
  section: "Graphics: Lighting",
  tags: ["shadowType","SHADOW_PCF5_32F","SHADOW_VSM_16F","SHADOW_PCSS_32F","vsmBlurSize","vsmBlurMode","penumbraSize","shadowSamples"],
  docs: ["repo/docs/user-manual/graphics/lighting/shadows.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
