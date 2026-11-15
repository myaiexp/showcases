// d2 example: Standalone image shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Standalone image shapes',
  summary:
    'A shape with `shape: image` and an `icon` shows only the picture; connections attach to it like to any shape. Without `shape: image` the same icon sits inside a rectangle.',
  section: 'Icons & Images',
  tags: ['image', 'icon', 'shape'],
  docs: ['repo/docs/tour/icons.md', 'repo/static/d2/icons-image.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
