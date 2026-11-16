// fabric example: Image filters: Blur slider
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Blur slider',
  summary:
    'filters.Blur on a city picture: the blur option runs from 0 to 1 relative to the image size, not in pixels.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'Blur', 'applyFilters'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Blur.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
