// observable-plot example: Image: dodge beeswarm
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image: dodge beeswarm',
  summary:
    'Circular portraits spread vertically by dodgeY so none overlap. The slider changes their radius. Portraits are drawn in code, not fetched.',
  section: 'Mark: Image',
  tags: ['image', 'dodgeY', 'r', 'preserveAspectRatio'],
  docs: ['repo/docs/marks/image.md', 'repo/docs/transforms/dodge.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
