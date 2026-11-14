// Zdog example: a Zdog model rendered into a group inside a hand-made SVG badge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG without Illustration',
  summary:
    'A "good dog" badge: the circle, dashed rim and label are ordinary SVG, and only the dog head in the middle is Zdog. The scene is a plain Anchor rendered with renderGraphSvg into one <g> of the badge, so the rest of the drawing stays put and everything scales without blur.',
  section: 'Extras',
  tags: ['renderGraphSvg', 'updateGraph', 'Anchor', 'Dragger', 'svg', 'viewBox'],
  docs: ['repo/content/extras.hbs', 'repo/modules/docs/api-anchor.hbs', 'repo/modules/docs/api-dragger.hbs', 'repo/modules/docs/shapes-shape.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
