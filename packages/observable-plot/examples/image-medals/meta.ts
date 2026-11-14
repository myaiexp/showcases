// observable-plot example: Image: circular clipping with r
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image: circular clipping with r',
  summary:
    'Portraits clipped to circles by the r option; preserveAspectRatio chooses which part of each image stays visible. Portraits are drawn in code, not fetched.',
  section: 'Mark: Image',
  tags: ['image', 'r', 'preserveAspectRatio'],
  docs: ['repo/docs/marks/image.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
