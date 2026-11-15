// globe-gl example: Rings: repeat period
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rings: repeat period",
  summary:
    "Left: each city emits a new ring every 500 ms (ringRepeatPeriod). Right: a period of 0 emits a single ring per ring object, so rings come only from new data added on a timer. A slider changes the left period.",
  section: "Rings Layer",
  tags: ['ringRepeatPeriod', 'ringsData', 'ringMaxRadius'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
