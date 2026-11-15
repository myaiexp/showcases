// galacean example: Scene: fog modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scene: fog modes",
  summary:
    "The scene's three fog types, cycled over a receding row of columns: Linear (fogStart to fogEnd), Exponential and ExponentialSquared (fogDensity). The full view has sliders for each parameter.",
  section: "Core",
  tags: ['Scene', 'fogMode', 'FogMode', 'fogColor', 'fogStart', 'fogEnd', 'fogDensity'],
  docs: [
    'repo/docs/en/core/scene.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
