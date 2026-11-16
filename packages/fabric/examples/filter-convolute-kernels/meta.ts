// fabric example: Image filters: Convolute kernels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Convolute kernels',
  summary:
    'filters.Convolute takes a square weight matrix: pick sharpen, emboss, edge detection, Sobel or a box blur and run it over the city picture, with the opaque option.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'Convolute', 'matrix', 'opaque'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Convolute.md',
    'repo/src/content/docs/docs/Old docs/fabric-filters.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
