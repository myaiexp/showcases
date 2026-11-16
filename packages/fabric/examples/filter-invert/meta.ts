// fabric example: Image filters: Invert and alpha
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Invert and alpha',
  summary:
    'filters.Invert has two options: invert switches the effect on, alpha also flips transparency, which makes the opaque still life see-through.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'Invert', 'applyFilters'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Invert.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
