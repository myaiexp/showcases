// cosmos-gl example: Point images
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point images',
  summary:
    'setImageData loads ImageData objects (here drawn on a canvas in code), setPointImageIndices says which one each point shows (-1 for none) and setPointImageSizes sizes them. Images are drawn above the point shape, which PointShape.None can hide.',
  section: 'Point styling',
  tags: ['setImageData', 'setPointImageIndices', 'setPointImageSizes', 'setPointShapes'],
  docs: ['repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
