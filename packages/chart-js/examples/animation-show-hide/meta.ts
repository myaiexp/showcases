// Chart.js example: custom transitions.show and transitions.hide animations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'How datasets appear and disappear',
  summary:
    'Hide a line from the legend and its points fly into the corner; show it and they fly back out. The transitions.show and transitions.hide options choose which properties animate.',
  section: 'Configuration',
  tags: ['animation', 'transitions', 'show', 'hide', 'legend', 'options.transitions'],
  docs: ['repo/docs/configuration/animations.md', 'repo/docs/developers/api.md', 'repo/docs/configuration/legend.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
