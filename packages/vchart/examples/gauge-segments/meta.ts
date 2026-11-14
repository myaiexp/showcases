// vchart example: Gauge with coloured segments
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Gauge with coloured segments",
  summary:
    "A common chart pairs a gauge series, drawn as three overlapping coloured bands with rounded segment corners, with a gaugePointer series on a 0 to 100 angle axis. updateData moves the pointer across the bands.",
  section: "Gauge, Progress and Liquid",
  tags: ['gauge', 'gaugePointer', 'common', 'segment', 'axes'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Gauge.md',
    'repo/docs/assets/option/en/series/gauge.md',
    'repo/docs/assets/option/en/series/gauge-pointer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
