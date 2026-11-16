// fabric example: Image filters: Grayscale modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Grayscale modes',
  summary:
    'filters.Grayscale has three modes, average, lightness and luminosity; the same picture goes through each in its own canvas and a select swaps the picture.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'Grayscale', 'mode'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Grayscale.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
