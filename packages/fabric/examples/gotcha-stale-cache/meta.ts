// fabric example: Gotchas: a cached object that will not repaint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gotchas: a cached object that will not repaint',
  summary:
    'Three rectangles recoloured every second: set("fill") repaints, a direct assignment keeps showing the old cached bitmap, and assignment plus dirty = true repaints. Turning objectCaching off makes the plain assignment work too.',
  section: 'Gotchas',
  tags: ['dirty', 'objectCaching', 'set', 'requestRenderAll'],
  docs: [
    'repo/src/content/docs/docs/Old docs/gotchas.md',
    'repo/src/content/docs/docs/Old docs/fabric-object-caching.mdx',
    'repo/src/content/docs/docs/core-concepts.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
