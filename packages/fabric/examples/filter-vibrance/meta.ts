// fabric example: Image filters: Vibrance slider
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Vibrance slider',
  summary:
    'filters.Vibrance on a portrait: like Saturation, but it boosts the dull colours more than the strong ones.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'Vibrance', 'applyFilters'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Vibrance.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
