// vchart example: Linear progress: cornerRadius and bandWidth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Linear progress: cornerRadius and bandWidth",
  summary:
    "A linearProgress chart draws a track and a fill bar from a value between 0 and 1. cornerRadius rounds the bar and bandWidth sets its thickness in pixels; sliders set both and the value.",
  section: "Gauge, Progress and Liquid",
  tags: ['linearProgress', 'xField', 'yField', 'cornerRadius', 'bandWidth', 'direction'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Progress.md',
    'repo/docs/assets/option/en/series/linear-progress.md',
    'repo/docs/assets/option/en/chart/linear-progress.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
