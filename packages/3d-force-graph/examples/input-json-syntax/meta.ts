// 3d-force-graph example: Input JSON syntax: the README's format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Input JSON syntax: the README's format",
  summary:
    "graphData takes nodes with an id (plus name and val) and links with the ids of their source and target. In the full view the JSON sits in a text area and the graph follows every edit.",
  section: "Input JSON syntax",
  tags: ['graphData', 'nodeAutoColorBy'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
