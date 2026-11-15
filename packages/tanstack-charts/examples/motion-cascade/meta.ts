// tanstack-charts example: Chart, then mark, then guide
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chart, then mark, then guide',
  summary:
    'The cascade is renderer default, chart, mark, axis, specific guide. The chart sets a slow tween, the line mark overrides it with a spring, and the x axis ticks use their own 180 ms tween. Same-type transitions inherit omitted fields, so the dots only say how long they take.',
  section: 'Motion',
  tags: ['motion', 'cascade', 'transition', 'axis.ticks.motion', 'tickLabels.motion'],
  docs: ['repo/docs/reference/motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
