// fabric example: Image filters: Add, remove and reorder filters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Add, remove and reorder filters',
  summary:
    'The filters array is a plain array: checkboxes push and splice filter instances in, buttons reverse or clear it, and applyFilters() redraws.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'applyFilters'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-filters.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
    'repo/src/content/docs/api/namespaces/filters/classes/Grayscale.md',
    'repo/src/content/docs/api/namespaces/filters/variables/Sepia.md',
    'repo/src/content/docs/api/namespaces/filters/classes/Brightness.md',
    'repo/src/content/docs/api/namespaces/filters/classes/Contrast.md',
    'repo/src/content/docs/api/namespaces/filters/classes/Pixelate.md',
    'repo/src/content/docs/api/namespaces/filters/classes/Blur.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
