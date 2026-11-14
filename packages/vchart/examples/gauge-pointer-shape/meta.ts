// vchart example: Gauge pointer shape and pin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Gauge pointer shape and pin",
  summary:
    "The gauge pointer is a rect or a path mark: width and height size it, innerPadding moves it off the pivot, and pin and pinBackground can be hidden. A select, three sliders and a pin toggle change them.",
  section: "Gauge, Progress and Liquid",
  tags: ['gauge', 'pointer', 'pin', 'pinBackground', 'innerPadding', 'width', 'height'],
  docs: [
    'repo/docs/assets/option/en/series/gauge-pointer.md',
    'repo/docs/assets/option/en/chart/gauge.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
