// playcanvas example: Light shadow settings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Light shadow settings",
  summary: "A shadow-casting spot light over moving pillars: shadowType (PCF 1x1 to 5x5, VSM 16 and 32 bit, PCSS), shadowResolution, shadowIntensity, the PCF biases, and the VSM blur mode, size and bias are all live controls.",
  section: "Components",
  tags: ["castShadows","shadowType","shadowResolution","shadowIntensity","shadowBias","normalOffsetBias","vsmBlurSize","vsmBias"],
  docs: ["repo/docs/user-manual/editor/scenes/components/light.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
