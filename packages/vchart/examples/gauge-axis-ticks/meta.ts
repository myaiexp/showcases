// vchart example: Gauge as a scale: angle axis ticks and labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Gauge as a scale: angle axis ticks and labels",
  summary:
    "A linear angle axis with min 0 and max 240 turns the dial into a speedometer scale; tickCount sets how many ticks it draws, and the data value is read in axis units. A slider changes tickCount.",
  section: "Gauge, Progress and Liquid",
  tags: ['gauge', 'axes', 'min', 'max', 'tickCount', 'label'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Gauge.md',
    'repo/docs/assets/option/en/chart/gauge.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
