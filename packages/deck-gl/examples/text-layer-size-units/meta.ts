// deck-gl example: TextLayer sizeUnits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TextLayer sizeUnits',
  summary:
    'Label size in pixels, meters or common units, multiplied by sizeScale and clamped by sizeMinPixels and sizeMaxPixels, so labels can follow the map or hold a fixed screen size.',
  section: 'Core layers',
  tags: ['TextLayer', 'sizeUnits', 'sizeScale', 'sizeMinPixels', 'sizeMaxPixels', 'getSize'],
  docs: [
    'repo/docs/api-reference/layers/text-layer.md',
    'repo/docs/developer-guide/coordinate-systems.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
