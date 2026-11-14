// vchart example: Liquid chart: liquidBackground and liquidOutline marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Liquid chart: liquidBackground and liquidOutline marks",
  summary: "A liquid chart is three marks: the liquid fill, the liquidBackground behind it and the liquidOutline around it. Each gets its own style here; a slider moves the fill level, and a select turns the background and outline on or off.",
  section: "Option: Series",
  tags: ["liquid.liquidBackground","liquidOutline","liquid.style","registerLiquidChart"],
  docs: [
    'repo/docs/assets/option/en/series/liquid.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
