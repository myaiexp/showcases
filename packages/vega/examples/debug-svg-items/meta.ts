// vega example: Debugging: SVG Items
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Debugging: From an SVG Element to Its Datum',
  summary:
    'An SVG-rendered bar chart where clicking a bar reads element.__data__, its scenegraph item, and __data__.datum, the row behind it, the by-hand version of the debugging guide\'s $0.__data__ trick.',
  section: 'Debugging',
  tags: ['debugging.scenegraph', 'view.renderer', 'view.hover'],
  docs: ['repo/docs/docs/api/debugging.md', 'repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
