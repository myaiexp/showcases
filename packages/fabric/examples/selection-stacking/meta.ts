// fabric example: Selection: multiSelectionStacking
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selection: multiSelectionStacking',
  summary:
    'ActiveSelection.multiSelectAdd() adds an object to a selection. With multiSelectionStacking "canvas-stacking" the members keep their canvas order; with "selection-order" each new member goes on top.',
  section: 'Selection',
  tags: ['ActiveSelection', 'multiSelectionStacking', 'multiSelectAdd', 'setActiveObject'],
  docs: [
    'repo/src/content/docs/api/classes/ActiveSelection.md',
    'repo/src/content/docs/api/interfaces/ActiveSelectionOptions.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
