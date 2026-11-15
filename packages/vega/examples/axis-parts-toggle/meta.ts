// vega example: Axis Parts: Domain, Ticks, Labels, Grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Axis Parts: Domain, Ticks, Labels, Grid",
  summary:
    "One axis with its four parts switched on and off by signals; the full view has a checkbox for each, the card steps through the combinations.",
  section: "Axes",
  tags: ["axes.domain","axes.ticks","axes.labels","axes.grid","signal.bind"],
  docs: ["repo/docs/docs/axes.md","repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
