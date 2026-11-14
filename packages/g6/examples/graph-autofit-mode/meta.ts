// g6 example: Graph option autoFit: view and center
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Graph option autoFit: view and center',
  summary:
    "A ring wider than the canvas is either scaled to fit (autoFit: 'view') or only centred at the current zoom ('center'). Each render() applies the setting again.",
  section: 'Graph',
  tags: ['autoFit', 'fitView', 'fitCenter', 'render'],
  docs: [
    'repo/packages/site/docs/manual/graph/option.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
