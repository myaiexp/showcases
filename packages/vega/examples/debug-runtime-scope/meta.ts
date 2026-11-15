// vega example: Debugging: Runtime Scope
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Debugging: Inspecting the Runtime Scope',
  summary:
    'view._runtime read as the debugging guide describes: a signal operator, a data set\'s input and post-filter nodes (twelve rows against however many pass the cutoff), a scale and the node count, updated as you move a slider.',
  section: 'Debugging',
  tags: ['debugging.runtime', 'view.data', 'transform.filter', 'signal.bind'],
  docs: ['repo/docs/docs/api/debugging.md', 'repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
