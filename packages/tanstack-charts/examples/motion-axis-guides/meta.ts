// tanstack-charts example: Motion for axes, ticks and labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Motion for axes, ticks and labels',
  summary:
    'Axes accept a motion policy as well: x.axis.motion for the axis and its grid, axis.ticks.motion for tick rules, axis.tickLabels.motion for labels, and axis.label.motion for the title. Rescaling the y domain here moves each guide with its own timing, and the toggle strips them back to the chart default.',
  section: 'Motion',
  tags: ['axis.motion', 'ticks.motion', 'tickLabels.motion', 'label.motion'],
  docs: [
    'repo/docs/reference/motion.md',
    'repo/docs/reference/scales-guides-and-color.md',
    'repo/docs/reference/marks/bar-and-rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
