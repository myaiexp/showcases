// motion example: Layout that follows the viewport size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout that follows the viewport size',
  summary: 'A mini web page in a frame whose width you slide: a live readout of the page size, a grid that adds and removes columns, and a menu that folds into a burger icon. resize() with only a callback watches the viewport, so it runs inside an iframe of its own.',
  section: 'Gestures',
  tags: ['resize', 'viewport', 'frame.render', 'iframe'],
  docs: ['pages/motion-dev/docs/resize.md', 'pages/motion-dev/docs/frame.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
