// vega example: Debugging: Data Versus State
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Debugging: signal and data Versus getState',
  summary:
    'A console comparing what view.signal and view.data can see (top-level signals, post-filter rows) with getState (nested group signals, pre-filter input rows once the data was edited), updated as you move the limit or insert rows.',
  section: 'Debugging',
  tags: ['debugging.signals', 'debugging.data', 'debugging.state', 'view.getState', 'view.signal', 'view.data'],
  docs: ['repo/docs/docs/api/debugging.md', 'repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
