// tanstack-charts example: Spring updates with the motion renderer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Spring updates with the motion renderer',
  summary:
    'mountChartRenderer with motion() replaces the default tween. Bars follow a spring with stiffness, damping and mass, so they overshoot a little and settle. Each new data set retargets the springs from the painted value and velocity, and svgAnimation is ignored.',
  section: 'Dynamic Data and Animation',
  tags: ['motion', 'mountChartRenderer', 'spring', 'transition'],
  docs: ['repo/docs/guides/dynamic-data-and-animation.md', 'repo/docs/reference/motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
