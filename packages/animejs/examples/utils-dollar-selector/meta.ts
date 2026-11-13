// Utilities example: Utils $() selector and scope root
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utils $() selector and scope root',
  summary: 'Sixteen squares in two rows are selected with utils.$(): once document-wide, and once inside a scope whose root is the second row. Squares pulse together while a readout shows how many elements each call returned.',
  section: 'Utilities',
  tags: ['utils.$', 'createScope', 'utils.set'],
  docs: [
    'pages/animejs-com/documentation/utilities.md',
    'pages/animejs-com/documentation/utilities/dollar-sign.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
