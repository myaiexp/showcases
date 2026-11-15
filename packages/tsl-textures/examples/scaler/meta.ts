// tsl-textures example: Scaler
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scaler',
  summary:
    'scaler() on positionNode and scaler.normal() on normalNode: vertices above a selection layer are scaled along x, y and z around a pivot, with a soft blend through the layer, so part of a sphere flattens or stretches.',
  section: 'Shape textures',
  tags: ['scaler', 'positionNode', 'normalNode', 'scales', 'selectorCenter'],
  docs: ['repo/docs/scaler.md', 'repo/src/scaler.js', 'repo/index.html', 'repo/docs/grid.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
