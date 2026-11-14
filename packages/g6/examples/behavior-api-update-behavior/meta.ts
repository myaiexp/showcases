// g6 example: Behavior API: updateBehavior by key
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Behavior API: updateBehavior by key',
  summary: 'graph.updateBehavior finds a behavior by its key and changes options such as enable and sensitivity without touching the others. The card disables panning and raises the zoom sensitivity in turn.',
  section: 'Behavior',
  tags: ['updateBehavior', 'key', 'enable', 'sensitivity'],
  docs: ['repo/packages/site/docs/api/behavior.en.md', 'repo/packages/site/docs/manual/behavior/overview.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
