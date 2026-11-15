// vega example: Legend Labels: labelOverlap, labelSeparation and labelLimit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Legend Labels: labelOverlap, labelSeparation and labelLimit",
  summary:
    "A crowded gradient legend thinned by labelOverlap (false, parity, greedy) and labelSeparation, beside a symbol legend whose long labels are truncated by labelLimit.",
  section: "Legends",
  tags: ["legends.labelOverlap","legends.labelSeparation","legends.labelLimit","legends.labelFontSize","legends.labelOffset","legends.tickCount"],
  docs: ["repo/docs/docs/legends.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
