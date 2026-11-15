// cosmos-gl example: Canvas click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas click',
  summary:
    'onClick is one callback for every click on the canvas. It receives the point index and position when a point is under the pointer, and undefined for both when the click lands on empty space, plus the mouse event.',
  section: 'Event callbacks',
  tags: ['onClick', 'focusedPointIndex'],
  docs: ['repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
