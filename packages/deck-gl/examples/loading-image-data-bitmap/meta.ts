// deck-gl example: ImageData as a BitmapLayer image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ImageData as a BitmapLayer image',
  summary:
    "When an app already has pixel values it needs no loader: a BitmapLayer takes an ImageData built from a Uint8ClampedArray directly. A plasma pattern is computed on the CPU and re-supplied as a new ImageData each frame.",
  section: 'Data and performance',
  tags: ['ImageData', 'BitmapLayer', 'image', 'Uint8ClampedArray', 'loading data'],
  docs: [
    'repo/docs/developer-guide/loading-data.md',
    'repo/docs/api-reference/layers/bitmap-layer.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
