// fabric example: Image filters: Order matters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Order matters',
  summary:
    'Grayscale then BlendColor, and BlendColor then Grayscale: the same two filters in a different order in the filters array give different pictures.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'Grayscale', 'BlendColor', 'applyFilters'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Grayscale.md',
    'repo/src/content/docs/api/namespaces/filters/classes/BlendColor.md',
    'repo/src/content/docs/docs/Old docs/fabric-filters.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
