// echarts example: Chord focus modes and per-node styles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Chord focus modes and per-node styles",
  summary:
    "Hover a sector of a chord diagram and choose what stays sharp with emphasis.focus (self, series or none) and blurScope, while individual nodes set their own colour, label and emphasis style. The preview highlights sectors by dispatchAction.",
  section: 'Option: series.chord',
  tags: ['chord', 'emphasis.focus', 'emphasis.blurScope', 'blur', 'data.itemStyle', 'data.emphasis', 'data.value', 'highlight'],
  docs: ['repo/en/option/series/chord.md', 'repo/en/option/series/graph.md', 'repo/en/option/partial/emphasis-common.md', 'repo/en/api/action.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
