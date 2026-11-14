// vchart example: Circular progress tickMask
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Circular progress tickMask",
  summary:
    "tickMask (visible: true, which the theme switches off) draws the progress ring as separate ticks of a fixed angle, like a segmented meter, with the filled part following the value. A slider sets the tick angle and another the value.",
  section: "Gauge, Progress and Liquid",
  tags: ['circularProgress', 'tickMask', 'angle', 'forceAlign'],
  docs: [
    'repo/docs/assets/option/en/series/circular-progress.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
