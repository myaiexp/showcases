// Chart.js example: animation: false versus update('none')
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animations on or off',
  summary:
    'Bars slide to new figures, jump straight to them for a single update, or jump every time. Setting animation to false switches motion off for good; update(\'none\') skips it once.',
  section: 'Configuration',
  tags: ['animation', 'update', 'bar', 'options.animation'],
  docs: ['repo/docs/configuration/animations.md', 'repo/docs/developers/api.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
