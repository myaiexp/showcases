// Layout example: toggling a flex direction with layout.update() and a staggered delay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout update with staggered delay',
  summary: 'layout.update() animates the items from a column to a row when a class toggles. The delay is stagger(), counting from the first or last item.',
  section: 'Layout',
  tags: ['createLayout', 'layout.update', 'stagger', 'delay', 'ease', 'revert'],
  docs: [
    'pages/animejs-com/documentation/layout.md',
    'pages/animejs-com/documentation/layout/usage/staggered-layout-animation.md',
    'pages/animejs-com/documentation/layout/layout-settings/delay.md',
    'pages/animejs-com/documentation/layout/layout-settings/duration.md',
    'pages/animejs-com/documentation/layout/layout-methods/update.md',
    'pages/animejs-com/documentation/layout/layout-methods/revert.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
