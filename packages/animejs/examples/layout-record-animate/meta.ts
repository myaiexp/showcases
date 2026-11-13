// Layout example: manual record() + animate(), update() and revert() on a DOM reorder
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout record, animate and revert',
  summary: 'Reorders DOM nodes two ways: record(), mutate, animate() by hand, or update() in one call. A slow transition can be completed early with revert().',
  section: 'Layout',
  tags: ['createLayout', 'record', 'animate', 'update', 'revert', 'then', 'utils.shuffle', 'onComplete'],
  docs: [
    'pages/animejs-com/documentation/layout/layout-methods.md',
    'pages/animejs-com/documentation/layout/layout-methods/record.md',
    'pages/animejs-com/documentation/layout/layout-methods/animate.md',
    'pages/animejs-com/documentation/layout/layout-methods/update.md',
    'pages/animejs-com/documentation/layout/layout-methods/revert.md',
    'pages/animejs-com/documentation/layout/usage/dom-order-change-animation.md',
    'pages/animejs-com/documentation/layout/layout-callbacks.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
