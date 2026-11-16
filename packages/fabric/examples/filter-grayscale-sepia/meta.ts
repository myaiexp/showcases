// fabric example: Image filters: Grayscale, Sepia, Brightness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Grayscale, Sepia, Brightness',
  summary:
    'Every FabricImage has a filters array. Push filter instances into it, call applyFilters(), and the image redraws filtered; several filters run in order, so Sepia then Brightness tints and lightens.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'applyFilters', 'Grayscale', 'Sepia', 'Brightness'],
  docs: ['repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md', 'repo/src/content/docs/docs/Old docs/fabric-filters.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
