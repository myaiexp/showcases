// fabric example: Image filters: HueRotation slider
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: HueRotation slider',
  summary:
    'filters.HueRotation turns every colour around the wheel; the rotation option runs from -1 to 1 and is multiplied by PI.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'HueRotation', 'applyFilters'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/HueRotation.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
