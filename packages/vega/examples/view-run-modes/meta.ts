// vega example: View: Run Modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: run, runAsync and runAfter',
  summary:
    'A timed log of one signal change pushed through view.run(), then view.runAsync() with prerun and postrun callbacks, and a runAfter callback registered from inside a signal listener, showing what happens before, during and after evaluation.',
  section: 'View API',
  tags: ['view.run', 'view.runAsync', 'view.runAfter', 'view.addSignalListener'],
  docs: ['repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
