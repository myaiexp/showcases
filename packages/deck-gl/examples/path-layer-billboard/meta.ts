// deck-gl example: PathLayer billboard
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PathLayer billboard',
  summary:
    'With billboard off a path is a ribbon lying on the ground, so it thins out when you tilt the map; with billboard on its width always faces the camera.',
  section: 'Core layers',
  tags: ['PathLayer', 'billboard', 'widthUnits', 'pitch'],
  docs: [
    'repo/docs/api-reference/layers/path-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
