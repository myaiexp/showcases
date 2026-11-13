// echarts example: Graph emphasis focus, scale and blur
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graph emphasis focus, scale and blur",
  summary:
    "Highlight a node and see what the emphasis state does to the rest. Hover a node in the full view, or pick emphasis.focus, blurScope, the highlight scale and the opacity of blurred nodes. The preview highlights nodes by dispatchAction.",
  section: 'Option: series.graph',
  tags: ['graph', 'emphasis.focus', 'emphasis.blurScope', 'emphasis.scale', 'blur', 'highlight'],
  docs: ['repo/en/option/series/graph.md', 'repo/en/option/partial/emphasis-common.md', 'repo/en/api/action.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
