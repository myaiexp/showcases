// fabric example: Image filters: Gamma per channel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Gamma per channel',
  summary:
    'filters.Gamma takes a [r, g, b] triple, so each colour channel gets its own slider and the picture shifts colour as well as brightness.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'Gamma', 'applyFilters'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Gamma.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
