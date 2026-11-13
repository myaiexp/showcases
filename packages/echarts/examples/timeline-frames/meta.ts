// echarts example: Timeline with options per frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Timeline with options per frame",
  summary:
    "A timeline with a baseOption and one option per year, auto-playing in a loop. The full view has play, stop and jump controls.",
  section: 'Option: Components',
  tags: ['timeline', 'baseOption', 'options', 'autoPlay', 'timelineChange'],
  docs: ['repo/en/option/component/timeline.md', 'repo/en/api/action.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
