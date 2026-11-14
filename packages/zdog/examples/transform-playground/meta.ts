// Zdog example: Transform playground, a paper plane under translate, rotate and scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transform playground',
  summary:
    'A paper plane you can slide, turn on each axis and resize with sliders, while the code for those values updates beside it. Every Zdog item has the same three transforms, so anything you build can be moved this way. The card flies the plane through a loop using all three at once.',
  section: 'API: Anchor',
  tags: ['Anchor', 'translate', 'rotate', 'scale', 'addTo', 'Shape'],
  docs: ['repo/modules/docs/api-anchor.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
