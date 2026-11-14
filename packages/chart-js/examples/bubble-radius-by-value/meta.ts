// Chart.js example: Bubble size from your own data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bubble size from your own data",
  summary:
    "Leave r out of the data points and give the dataset a scriptable radius: a function that reads your own field and returns pixels. Switch between size by radius and size by area.",
  section: 'Chart types',
  tags: ['radius','scriptable','bubble'],
  docs: ['repo/docs/charts/bubble.md', 'repo/docs/general/options.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
