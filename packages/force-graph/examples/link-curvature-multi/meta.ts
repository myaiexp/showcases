// force-graph example: Link styling: several links between two nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: several links between two nodes',
  summary:
    'Links that join the same two nodes would be drawn on top of each other. Giving each a different linkCurvature from an attribute, spread evenly around zero, fans them out so every one is visible and has its own colour and tooltip.',
  section: 'Link styling',
  tags: ['linkCurvature', 'linkLabel', 'linkDirectionalArrowLength', 'linkDirectionalArrowRelPos', 'd3Force'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
