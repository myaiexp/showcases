// g6 example: History: filter commands with beforeAddCommand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'History: filter commands with beforeAddCommand',
  summary: 'beforeAddCommand returns false to keep a command out of the stack: here only removals are recorded, so undo skips over adds and recolours.',
  section: 'Plugin',
  tags: ['history', 'beforeAddCommand', 'HistoryEvent.ADD', 'undo'],
  docs: ['repo/packages/site/docs/manual/plugin/History.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
