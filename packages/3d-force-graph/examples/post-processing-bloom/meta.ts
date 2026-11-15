// 3d-force-graph example: Render control: postProcessingComposer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render control: postProcessingComposer",
  summary:
    "postProcessingComposer() hands back the three EffectComposer; adding an UnrealBloomPass makes bright nodes glow. Sliders set the pass's strength, radius and threshold.",
  section: "Render control",
  tags: ['postProcessingComposer', 'backgroundColor', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
