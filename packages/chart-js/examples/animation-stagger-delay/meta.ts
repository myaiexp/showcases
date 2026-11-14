// Chart.js example: a scriptable animation delay that staggers bars by index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bars that arrive one after another',
  summary:
    'Each bar waits a little longer than the one before it, so the chart builds up like a wave. The animation.delay option is a function of the bar\'s dataIndex and datasetIndex.',
  section: 'Configuration',
  tags: ['animation', 'delay', 'scriptable', 'bar', 'options.animation.delay'],
  docs: ['repo/docs/configuration/animations.md', 'repo/docs/general/options.md', 'repo/docs/developers/api.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
