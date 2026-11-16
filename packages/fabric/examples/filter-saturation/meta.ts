// fabric example: Image filters: Saturation slider
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Saturation slider',
  summary:
    'filters.Saturation on a fruit still life: negative values drain the colour, positive values push it past natural.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'Saturation', 'applyFilters'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Saturation.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
