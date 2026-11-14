// observable-plot example: Image: imageRendering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image: imageRendering',
  summary:
    'An 8 by 8 raster enlarged by the image mark: auto interpolates and blurs it, pixelated keeps hard edges (not supported in WebKit).',
  section: 'Mark: Image',
  tags: ['image', 'imageRendering', 'width'],
  docs: ['repo/docs/marks/image.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
