// Chart.js example: interaction.axis x, y and xy in nearest mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Nearest along x, y or both',
  summary:
    'Sleep against mood: park the pointer between two nights and the answer changes with the axis. With axis x the closest night by hours slept wins, with y the closest mood, with xy the closest overall.',
  section: 'Configuration',
  tags: ['interaction', 'axis', 'nearest', 'scatter', 'options.interaction.axis'],
  docs: ['repo/docs/configuration/interactions.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
