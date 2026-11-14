// Chart.js example: Spin in or grow in
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Spin in or grow in",
  summary:
    "animateRotate spins the chart into place and animateScale grows it from the centre. They only play when a chart is created, so Replay builds it again.",
  section: 'Chart types',
  tags: ['animateRotate','animateScale','animation','doughnut'],
  docs: ['repo/docs/charts/doughnut.md', 'repo/docs/configuration/animations.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
