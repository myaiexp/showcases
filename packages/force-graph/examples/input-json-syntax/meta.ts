// force-graph example: Input JSON syntax: the README's format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Input JSON syntax: the README\'s format',
  summary:
    'The README\'s JSON shape: nodes with id, name and val, and links with source and target ids. The full view parses a textarea on every edit and hands it to graphData; the card alternates between two samples.',
  section: 'Input JSON syntax',
  tags: ['graphData', 'nodeLabel', 'nodeVal', 'nodeId'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
