// deck-gl example: PolygonLayer outline joints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PolygonLayer outline joints',
  summary:
    'Star-shaped polygons with sharp corners: lineJointRounded rounds the outline joints, lineMiterLimit cuts mitered spikes, and lineAntialiasing smooths the stroke edges.',
  section: 'Core layers',
  tags: ['PolygonLayer', 'lineJointRounded', 'lineMiterLimit', 'lineAntialiasing'],
  docs: [
    'repo/docs/api-reference/layers/polygon-layer.md',
    'repo/docs/api-reference/layers/path-layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
