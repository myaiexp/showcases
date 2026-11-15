// zephyr3d example: OIT modes: none, weighted, dual-depth, abuffer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'OIT modes: none, weighted, dual-depth, abuffer',
  summary:
    'Intersecting translucent spheres and a torus whose blend order changes as they move. camera.oitMode switches between plain sorted blending and the order-independent techniques; supportDevice() tells which ones this device can run (ABuffer needs WebGPU). The card flips between none and weighted.',
  section: 'Transparency',
  tags: ['oitMode', 'WeightedBlendedOIT', 'DualDepthPeelingOIT', 'ABufferOIT', 'supportDevice', 'blendMode'],
  docs: ['repo/apps/doc/web/en/oit.md', 'repo/apps/doc/web/en/particles-sprites.md', 'repo/apps/doc/src/tut-77/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
