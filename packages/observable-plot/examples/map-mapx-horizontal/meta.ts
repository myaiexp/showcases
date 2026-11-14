// observable-plot example: Map: mapX on a horizontal walk
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Map: mapX on a horizontal walk',
  summary:
    'mapX applies the cumsum method to the x channel. With z separating three series, each accumulates on its own while time runs down the y axis.',
  section: 'Transform: Map',
  tags: ['lineX', 'mapX', 'cumsum', 'z'],
  docs: ['repo/docs/transforms/map.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
