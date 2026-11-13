// Layout example: reading the properties of an AutoLayout instance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout instance properties readout',
  summary: 'A table of the AutoLayout properties (root, id, children, properties, enterFromParams, leaveToParams, timeline, and the animating, entering, leaving and swapping arrays), refreshed after every update().',
  section: 'Layout',
  tags: ['createLayout', 'root', 'id', 'timeline', 'entering', 'leaving', 'animating'],
  docs: [
    'pages/animejs-com/documentation/layout/layout-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
