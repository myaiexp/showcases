// galacean example: Procedural sky tint colours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Procedural sky tint colours",
  summary:
    "skyTint colours the upper sky and groundTint the ground below the horizon. The card sweeps the hue of each; the full view has colour pickers. The camera tilts to show both halves.",
  section: "Background",
  tags: ['SkyProceduralMaterial', 'skyTint', 'groundTint'],
  docs: [
    'repo/docs/en/graphics/background/sky.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
