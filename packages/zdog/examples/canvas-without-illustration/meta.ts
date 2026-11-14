// Zdog example: a Zdog balloon rendered into a hand-managed 2D canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas without Illustration',
  summary:
    'A hot-air balloon floating over a sky and hills painted with the ordinary canvas API. Zdog only draws the balloon: the scene is a plain Anchor, updated with updateGraph and painted with renderGraphCanvas into a canvas the page manages itself, the way a game would mix Zdog into its own drawing.',
  section: 'Extras',
  tags: ['renderGraphCanvas', 'updateGraph', 'Anchor', 'Dragger', 'canvas'],
  docs: ['repo/content/extras.hbs', 'repo/modules/docs/api-anchor.hbs', 'repo/modules/docs/api-dragger.hbs', 'repo/modules/docs/shapes-composite.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
