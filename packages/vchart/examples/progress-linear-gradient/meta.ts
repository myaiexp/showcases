// vchart example: Linear progress with a gradient fill
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Linear progress with a gradient fill",
  summary:
    "progress.style.fill takes a linear gradient with colour stops, here teal to purple across the bar, while band and linear axes label the chart. The value changes every 1.8 seconds and the fill grows into it.",
  section: "Gauge, Progress and Liquid",
  tags: ['linearProgress', 'progress.style.fill', 'gradient', 'axes'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Progress.md',
    'repo/docs/assets/option/en/series/linear-progress.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
