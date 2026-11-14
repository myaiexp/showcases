// VFX-JS example: VoronoiEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'VoronoiEffect',
  summary:
    'A flower bed cut into Voronoi cells that shrink away from the pointer, leaving bgColor in the gaps. breathe shrinks the other cells on moving noise and flatCells gives every cell one flat colour. Cards use a stand-in pointer.',
  section: '@vfx-js/effects',
  tags: ['VoronoiEffect', 'effect', 'cellSize', 'press', 'pressRadius', 'flatCells', 'breathe', 'pointer', 'mouse'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/voronoi.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
