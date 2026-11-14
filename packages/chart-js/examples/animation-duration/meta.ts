// Chart.js example: set how many milliseconds the bar animation takes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation speed',
  summary:
    'Drag the slider to make the bars grow in a flash or take their time, then replay. The animation.duration option is just a number of milliseconds; 0 turns the motion off.',
  section: 'Configuration',
  tags: ['animation', 'duration', 'bar', 'options.animation.duration'],
  docs: ['repo/docs/configuration/animations.md', 'repo/docs/developers/api.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
