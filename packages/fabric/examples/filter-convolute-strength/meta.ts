// fabric example: Image filters: Convolute sharpen strength
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Convolute sharpen strength',
  summary:
    'One strength slider builds the 3x3 sharpen kernel for filters.Convolute, keeping the weights summing to 1.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'Convolute', 'matrix'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Convolute.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
