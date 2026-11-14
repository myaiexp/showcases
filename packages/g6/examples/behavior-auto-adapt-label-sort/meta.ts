// g6 example: Auto-adapt label: sortNode centrality
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Auto-adapt label: sortNode centrality',
  summary: 'sortNode ranks nodes for label priority by degree, betweenness, closeness or pagerank, or by a custom comparison, so a different node keeps its label.',
  section: 'Behavior',
  tags: ['auto-adapt-label', 'sortNode', 'centrality', 'updateBehavior'],
  docs: ['repo/packages/site/docs/manual/behavior/AutoAdaptLabel.en.md', 'repo/packages/site/common/api/behaviors/auto-adapt-label.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
