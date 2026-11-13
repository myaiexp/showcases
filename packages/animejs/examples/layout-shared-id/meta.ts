// Layout example: one element morphing between two containers through data-layout-id
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout shared data-layout-id',
  summary: 'Two elements in different containers share a data-layout-id. Hiding one and showing the other makes the layout animate between them, with no cloning or moving.',
  section: 'Layout',
  tags: ['createLayout', 'data-layout-id', 'layout.update', 'display none', 'properties'],
  docs: [
    'pages/animejs-com/documentation/layout/layout-id-attribute.md',
    'pages/animejs-com/documentation/layout/layout-settings/properties.md',
    'pages/animejs-com/documentation/layout/usage/css-display-property-animation.md',
    'pages/animejs-com/documentation/layout/usage/specifying-a-root.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
