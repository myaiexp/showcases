// Zdog example: copyGraph forest, copy with children versus without
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'copyGraph forest',
  summary:
    'A single tree, a trunk with a leafy crown and an apple added as children, planted six more times. copyGraph() brings the children along and gives a forest; plain copy() copies only the trunk and leaves bare sticks. Switch between the two to see the difference.',
  section: 'Modeling',
  tags: ['copyGraph', 'copy', 'Shape', 'addTo', 'children', 'remove'],
  docs: [
    'repo/modules/docs/modeling-concepts.hbs',
    'repo/modules/docs/copy-graph-example.hbs',
    'repo/modules/docs/api-anchor.hbs',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
