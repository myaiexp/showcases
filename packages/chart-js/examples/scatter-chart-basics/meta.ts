// Chart.js example: Scatter: does one thing go with another
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scatter: does one thing go with another",
  summary:
    "Each dot is one person, placed by height and weight. A scatter chart takes plain {x, y} points on two number axes, so clusters and trends show up by eye.",
  section: 'Chart types',
  tags: ['scatter','linear','datasets'],
  docs: ['repo/docs/charts/scatter.md', 'repo/docs/axes/labelling.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
