// tanstack-charts example: Reducer outputs per bin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reducer outputs per bin",
  summary:
    "outputs names three reducers evaluated over each bin: count, the mean of cylinders and the maximum weight. A select picks which output drives color; the tooltip shows all of them for the bin under the pointer.",
  section: "Hexbin Mark",
  tags: ['tooltip format', 'hexbin', 'outputs', 'reduce', 'mean', 'max', 'color'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/marks/hexbin.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
