// vchart example: Load on demand: a register per chart type
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Load on demand: a register per chart type",
  summary:
    "VChart.useRegisters takes the register function of each chart type plus the components it needs. Picking a chart shows the call a lean bundle would make; the gallery itself imports the whole package, so registering is shown, not measured.",
  section: "Load on Demand",
  tags: ['VChart.useRegisters','registerBarChart','registerPieChart','registerTooltip'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Load_on_Demand.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
