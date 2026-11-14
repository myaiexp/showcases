// observable-plot example: Image: default size and width
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image: default size and width',
  summary:
    'A favorable-against-unfavorable scatterplot of portraits. Images default to 16 by 16 pixels, and a width alone raises both dimensions. Portraits are drawn in code, not fetched.',
  section: 'Mark: Image',
  tags: ['image', 'width', 'aspectRatio', 'grid'],
  docs: ['repo/docs/marks/image.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
