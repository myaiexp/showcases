// Chart.js example: the events option with onHover and onClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which events the chart listens to',
  summary:
    'Make a chart react only to clicks, only to mouse movement, or to nothing at all, and watch the onHover and onClick callbacks fire. The options.events list names the browser events Chart.js listens for.',
  section: 'Configuration',
  tags: ['interaction', 'events', 'onHover', 'onClick', 'bar', 'options.events'],
  docs: ['repo/docs/configuration/interactions.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
