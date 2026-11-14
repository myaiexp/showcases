// echarts example: Drill-down with universalTransition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drill-down with universalTransition',
  summary:
    'Bars that split into their children and merge back as the chart drills through three levels, linked by groupId and childGroupId; the same series can also morph between bar and pie.',
  section: 'Animation',
  tags: ['universalTransition', 'groupId', 'childGroupId', 'divideShape', 'getZr'],
  docs: [
    'repo/en/option/partial/universal-transition.md',
    'repo/en/option/partial/group-id.md',
    'repo/contents/en/how-to/animation/transition.md',
    'repo/en/api/echarts-instance.md',
    'repo/contents/en/concepts/event.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
