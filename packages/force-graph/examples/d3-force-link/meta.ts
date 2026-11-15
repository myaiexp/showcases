// force-graph example: Force engine: the link force
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: the link force',
  summary:
    'd3Force(\'link\') holds links at a rest length. Giving distance() a function of the link\'s value makes strongly weighted links longer, and the width shows the same value.',
  section: 'Force engine configuration',
  tags: ['d3Force', 'linkWidth', 'forceLink'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
