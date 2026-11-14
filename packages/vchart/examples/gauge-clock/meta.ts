// vchart example: Clock from gaugePointer series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Clock from gaugePointer series",
  summary:
    "Three gaugePointer series on a 0 to 60 linear angle axis make hour, minute and second hands, fed the real time once a second. A custom animationUpdate keeps the hands turning clockwise through twelve.",
  section: "Gauge, Progress and Liquid",
  tags: ['gaugePointer', 'common', 'axes', 'animationUpdate', 'updateData', 'radiusField'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Gauge.md',
    'repo/docs/assets/option/en/series/gauge-pointer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
