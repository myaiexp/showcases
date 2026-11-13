// echarts example: Parallel axes that expand on click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Parallel axes that expand on click',
  summary:
    'Ten parallel axes of exam marks with axisExpandable on: a group of axes is spread out around axisExpandCenter and the rest squeezed. Change the center, count and width, or the trigger.',
  section: 'Option: series.parallel',
  tags: ['parallel', 'axisExpandable', 'axisExpandCenter', 'axisExpandCount', 'axisExpandWidth', 'axisExpandTriggerOn'],
  docs: [
    'repo/en/option/component/parallel.md',
    'repo/en/option/component/parallel-axis.md',
    'repo/en/option/series/parallel.md',
    'repo/en/option/partial/parallel.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
