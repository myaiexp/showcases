// Chart.js example: a custom Interaction.modes entry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom interaction mode',
  summary:
    'Hover a month and the tooltip lists only the drinks that sold at least the floor you set. The rule is a function added to Interaction.modes and named in interaction.mode.',
  section: 'Configuration',
  tags: ['interaction', 'mode', 'custom', 'tooltip', 'developers', 'options.interaction.mode'],
  docs: ['repo/docs/configuration/interactions.md', 'repo/docs/configuration/tooltip.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
