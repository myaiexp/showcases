// fabric example: Image filters: Brightness slider
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Brightness slider',
  summary:
    'One filters.Brightness instance on a FabricImage: drag the slider and its brightness value changes, then applyFilters() redraws the picture lighter or darker.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'Brightness', 'applyFilters'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Brightness.md',
    'repo/src/content/docs/docs/Old docs/fabric-filters.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
