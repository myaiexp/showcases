// vchart example: Gauge with a gradient dial and custom pointer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Gauge with a gradient dial and custom pointer",
  summary:
    "gauge.type: 'circularProgress' swaps in a progress dial whose progress.style.fill is a conical gradient, with a track behind it. The pointer, pin and pinBackground take custom path shapes.",
  section: "Gauge, Progress and Liquid",
  tags: ['gauge', 'circularProgress', 'gradient', 'conical', 'pointer', 'pin', 'pinBackground'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Gauge.md',
    'repo/docs/assets/option/en/series/gauge-pointer.md',
    'repo/docs/assets/option/en/chart/gauge.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
