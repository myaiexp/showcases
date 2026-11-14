// Zdog example: a slideshow of three models shown one at a time by renderGraph
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render graph slideshow',
  summary:
    'A pine tree, a mushroom and an ice cream cone take turns on one canvas, each popping in as the last disappears. None of them is added to the Illustration: renderGraph(item) draws whichever model you pass, so one canvas can show many models without hiding or removing anything.',
  section: 'API: Illustration',
  tags: ['Illustration', 'renderGraph', 'updateGraph', 'Anchor'],
  docs: ['repo/modules/docs/api-illo.hbs', 'repo/modules/docs/api-anchor.hbs', 'repo/modules/docs/shapes-composite.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
