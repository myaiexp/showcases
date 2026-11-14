// vchart example: Bar: horizontal bars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: horizontal bars',
  summary:
    'direction: \'horizontal\' swaps the roles of the axes: xField carries the number, yField the category. Labels sit at the bar ends and the ranking reshuffles as new values arrive.',
  section: 'Bar',
  tags: ['direction', 'xField', 'yField', 'label'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Bar.md',
    'repo/docs/assets/option/en/series/bar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
