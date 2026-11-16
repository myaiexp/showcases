// fabric example: Image filters: Composed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Composed',
  summary:
    'filters.Composed holds sub-filters and runs them in order as one entry of the filters array; compare it with the three filters listed separately.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'Composed', 'subFilters'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Composed.md',
    'repo/src/content/docs/api/namespaces/filters/variables/Sepia.md',
    'repo/src/content/docs/api/namespaces/filters/classes/Brightness.md',
    'repo/src/content/docs/api/namespaces/filters/classes/Contrast.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
