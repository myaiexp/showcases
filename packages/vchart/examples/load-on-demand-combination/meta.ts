// vchart example: Load on demand: combination chart registers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Load on demand: combination chart registers",
  summary:
    "A common (combination) chart needs registerCommonChart, a register for each series type it draws and the two axes. The selector switches between three combinations and lists the matching useRegisters call; registering is shown, not measured.",
  section: "Load on Demand",
  tags: ['registerCommonChart','registerBarSeries','registerLineSeries','useRegisters'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Load_on_Demand.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
