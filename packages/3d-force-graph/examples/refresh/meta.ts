// 3d-force-graph example: Render control: refresh
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render control: refresh",
  summary:
    "Node colours are changed in place in the data, which the graph does not notice; refresh() then redraws every node and link from the data. The nodeColor('color') attribute is read again only then.",
  section: "Render control",
  tags: ['refresh', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
