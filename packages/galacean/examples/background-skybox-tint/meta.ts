// galacean example: Skybox exposure, rotation and tint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Skybox exposure, rotation and tint",
  summary:
    "SkyBoxMaterial adjusts a cube texture without repainting it: exposure scales brightness, rotation spins the sky around the up axis and tintColor multiplies it. The card sweeps all three; the full view has sliders.",
  section: "Background",
  tags: ['SkyBoxMaterial', 'exposure', 'rotation', 'tintColor'],
  docs: [
    'repo/docs/en/graphics/background/sky.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
