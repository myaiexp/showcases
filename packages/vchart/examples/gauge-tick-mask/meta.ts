// vchart example: Gauge tickMask
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Gauge tickMask",
  summary:
    "tickMask with visible: true (the theme leaves it off) on a circularProgress dial cuts the arc into ticks: angle sets each tick's width in degrees, offsetAngle shifts them and forceAlign keeps the filled part on a tick edge. Sliders set the three values and the reading.",
  section: "Gauge, Progress and Liquid",
  tags: ['gauge', 'circularProgress', 'tickMask', 'angle', 'offsetAngle', 'forceAlign'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Gauge.md',
    'repo/docs/assets/option/en/series/gauge.md',
    'repo/docs/assets/option/en/series/circular-progress.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
