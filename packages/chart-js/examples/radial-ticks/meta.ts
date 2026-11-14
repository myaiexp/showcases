// Chart.js example: Radar rings and their numbers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Radar rings and their numbers",
  summary:
    "The rings of a radar are the radial ticks: ticks.count sets how many, showLabelBackdrop and backdropPadding style the numbers on them, and grid.color tints the rings.",
  section: 'Axes',
  tags: ['ticks.count','ticks.showLabelBackdrop','ticks.backdropPadding','grid.color','scales.r'],
  docs: ['repo/docs/axes/radial/linear.md','repo/docs/axes/radial/index.md','repo/docs/axes/_common_ticks.md','repo/docs/charts/radar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
