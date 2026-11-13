// Layout example: modal dialog animation with layout ids and explicit children
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout modal dialog animation',
  summary: 'Each button expands into a dialog and shrinks back, animated by one layout rooted on the dialog. Layout ids and an explicit children list let it animate elements outside its root. The dialog stays inside the example.',
  section: 'Layout',
  tags: ['createLayout', 'children', 'properties', 'data-layout-id', 'update', 'dialog'],
  docs: [
    'pages/animejs-com/documentation/layout/usage/animate-modal-dialog.md',
    'pages/animejs-com/documentation/layout/usage.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
