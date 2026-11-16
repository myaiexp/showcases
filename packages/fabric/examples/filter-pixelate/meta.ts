// fabric example: Image filters: Pixelate blocksize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Pixelate blocksize',
  summary:
    'filters.Pixelate replaces every blocksize by blocksize square of the picture with one colour; drag the slider from fine to chunky.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'Pixelate', 'applyFilters'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Pixelate.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
