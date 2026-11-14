// deck-gl example: PathLayer basics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PathLayer basics',
  summary:
    'Polylines from a getPath accessor: each line carries its own colour and a width in metres, with a minimum width in pixels and a hover tooltip.',
  section: 'Core layers',
  tags: ['PathLayer', 'getPath', 'getColor', 'getWidth', 'widthMinPixels', 'pickable'],
  docs: ['repo/docs/api-reference/layers/path-layer.md', 'repo/docs/api-reference/core/layer.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
