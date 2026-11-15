// l7 example: PlaneGeometry terrainClipHeight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PlaneGeometry terrainClipHeight',
  summary:
    'terrainClipHeight hides the terrain below a height, keeping only the hills. Raise it and the low ground disappears.',
  section: 'Other Layers',
  tags: ['GeometryLayer', 'shape(\'plane\')', 'terrainClipHeight', 'terrainTexture', 'rgb2height'],
  docs: [
    'repo/site/docs/api/other/plane.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
