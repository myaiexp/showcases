// tanstack-charts example: Staggering by series and role
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Staggering by series and role',
  summary:
    'With by: series the delay follows the series index instead of the datum index, and roles limits it to one kind of target. Here three lines enter one after another while their dots, which are not in the line role, enter together. The entrance is replayed by mounting the chart again.',
  section: 'Motion',
  tags: ['stagger', 'by series', 'roles', 'seriesIndex'],
  docs: ['repo/docs/reference/motion.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
