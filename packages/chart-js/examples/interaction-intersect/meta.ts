// Chart.js example: interaction.intersect true versus false
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hover on the point or anywhere near it',
  summary:
    'With intersect on, the tooltip appears only when the pointer touches a point; with it off, the closest point answers wherever you are. The interaction.intersect option makes a chart picky or forgiving.',
  section: 'Configuration',
  tags: ['interaction', 'intersect', 'hover', 'tooltip', 'line', 'options.interaction.intersect'],
  docs: ['repo/docs/configuration/interactions.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
