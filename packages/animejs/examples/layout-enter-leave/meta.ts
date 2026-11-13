// Layout example: enterFrom and leaveTo state parameters while adding and removing items
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout enterFrom and leaveTo states',
  summary: 'Items added to the root enter from a scaled-down, offset state; hidden items leave to another one and are removed from the DOM through layout.leaving once the animation ends.',
  section: 'Layout',
  tags: ['createLayout', 'enterFrom', 'leaveTo', 'layout.update', 'layout.leaving', 'then'],
  docs: [
    'pages/animejs-com/documentation/layout/states-parameters.md',
    'pages/animejs-com/documentation/layout/states-parameters/enterFrom.md',
    'pages/animejs-com/documentation/layout/states-parameters/leaveTo.md',
    'pages/animejs-com/documentation/layout/layout-methods/update.md',
    'pages/animejs-com/documentation/layout/layout-callbacks.md',
    'pages/animejs-com/documentation/layout/common-auto-layout-gotchas.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
