// Spark example: SplatMesh recolor and opacity multiplied into every splat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SplatMesh recolor and opacity',
  summary:
    'A rainbow torus knot whose whole-mesh tint (recolor, a THREE.Color) and global opacity are plain properties changed every frame. They multiply into each splat’s colour and alpha, so values above 1 brighten. The card sweeps the hue and pulses opacity; the full view hands both to sliders.',
  section: 'SplatMesh',
  tags: ['recolor', 'opacity'],
  docs: ['repo/docs/docs/splat-mesh.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
