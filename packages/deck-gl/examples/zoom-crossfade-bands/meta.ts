// deck-gl example: Crossfading GridLayer zoom bands
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Crossfading GridLayer zoom bands',
  summary:
    "Three GridLayers with shrinking cell sizes and a ScatterplotLayer for single points, each with an opacity computed from the zoom by interpolateZoom, so the data hands over from coarse to fine without popping.",
  section: 'Data and performance',
  tags: ['GridLayer', 'opacity', 'interpolateZoom', 'cellSize', 'visible', 'zoom bands'],
  docs: [
    'repo/docs/developer-guide/zoom-dependent-layers.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
