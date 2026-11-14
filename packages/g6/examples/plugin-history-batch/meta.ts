// g6 example: History: one command for several draws
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'History: one command for several draws',
  summary: 'Calling startBatch and endBatch on the graph context groups several draws into a single history command, so one undo reverts the whole edit instead of one step per draw.',
  section: 'Plugin',
  tags: ['history', 'batch', 'startBatch', 'endBatch', 'HistoryEvent.ADD'],
  docs: ['repo/packages/site/docs/manual/plugin/History.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
