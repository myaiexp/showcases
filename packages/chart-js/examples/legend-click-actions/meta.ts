// Chart.js example: legend.onClick, onHover and onLeave with custom behaviour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What clicking the legend does',
  summary:
    'By default a click hides one line. Here the click is yours: hide Espresso and Filter together, or show only the line you clicked. Set plugins.legend.onClick, and onHover and onLeave to react to the pointer.',
  section: 'Configuration',
  tags: ['legend', 'onClick', 'onHover', 'onLeave', 'line', 'options.plugins.legend.onClick'],
  docs: ['repo/docs/configuration/legend.md', 'repo/docs/developers/api.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
