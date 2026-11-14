// g6 example: History: button states from the change event
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'History: button states from the change event',
  summary: 'history.on(HistoryEvent.CHANGE) fires when either stack changes, so undo and redo buttons can be disabled from canUndo() and canRedo(). undoAndCancel() undoes without leaving a redo step.',
  section: 'Plugin',
  tags: ['history', 'HistoryEvent.CHANGE', 'canUndo', 'canRedo', 'undoAndCancel'],
  docs: ['repo/packages/site/docs/manual/plugin/History.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
