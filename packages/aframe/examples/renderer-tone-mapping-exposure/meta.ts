// aframe example: renderer: toneMapping and exposure, set at runtime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "renderer: toneMapping and exposure, set at runtime",
  summary: "toneMapping and exposure are two of the few renderer properties that can change after the scene starts. A select cycles the tone mapping curve (no, ACESFilmic, linear, reinhard, cineon, AgX, neutral) over bright, saturated shapes and a slider sets the exposure.",
  section: 'Components',
  tags: ["renderer", "toneMapping", "exposure", "ACESFilmic", "reinhard", "cineon", "AgX", "neutral"],
  docs: ["repo/docs/components/renderer.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
