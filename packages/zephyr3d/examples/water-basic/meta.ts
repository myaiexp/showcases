// zephyr3d example: Water node: region, gridScale, animationSpeed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Water node: region, gridScale, animationSpeed",
  summary:
    "new Water(scene) renders a clipmap surface around the camera. Its X/Z scale sets the covered region, gridScale the grid spacing, animationSpeed the wave clock, and wireframe shows the clipmap grid. FBM waves drive it.",
  section: "Environment",
  tags: ['Water', 'gridScale', 'animationSpeed', 'wireframe', 'waveGenerator', 'FBMWaveGenerator'],
  docs: ['repo/apps/doc/web/en/water.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
