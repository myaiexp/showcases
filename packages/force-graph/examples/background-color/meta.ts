// force-graph example: Container layout: backgroundColor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Container layout: backgroundColor',
  summary:
    'backgroundColor fills the canvas, which is transparent by default. On a dark colour the default faint dark lines vanish, so linkColor is set to a light one; both follow the brightness of the chosen colour.',
  section: 'Container layout',
  tags: ['backgroundColor', 'linkColor', 'nodeAutoColorBy', 'autoPauseRedraw'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
