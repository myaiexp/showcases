// deck-gl example: PathLayer width units
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PathLayer width units',
  summary:
    'widthUnits switches getWidth between meters, common units and screen pixels; widthScale, widthMinPixels and widthMaxPixels bound how thick or thin the paths get as you zoom.',
  section: 'Core layers',
  tags: ['PathLayer', 'widthUnits', 'widthScale', 'widthMinPixels', 'widthMaxPixels'],
  docs: [
    'repo/docs/api-reference/layers/path-layer.md',
    'repo/docs/developer-guide/coordinate-systems.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
