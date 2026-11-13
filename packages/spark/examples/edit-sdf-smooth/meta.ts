// Spark example: sdfSmooth and softEdge blending of several SDFs in one edit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edit SDF smoothing',
  summary:
    'A sphere, a box and a capsule, coloured red, green and blue, sit in a single SET_RGB SplatEdit and drift across a torus knot. sdfSmooth sets how softly their colours blend where the shapes meet, and softEdge how wide each shape’s own edge is. The card sweeps sdfSmooth by itself; the full view has sliders.',
  section: 'Splat Editing',
  tags: ['SplatEdit', 'SplatEditSdf', 'sdfSmooth', 'softEdge', 'SET_RGB', 'SPHERE', 'BOX', 'CAPSULE'],
  docs: ['repo/docs/docs/splat-editing.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
