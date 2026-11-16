// fabric example: Image filters: Contrast slider
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Contrast slider',
  summary:
    'A filters.Contrast on an image of a city: positive values harden the tones, negative values flatten them to grey.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'Contrast', 'applyFilters'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Contrast.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
