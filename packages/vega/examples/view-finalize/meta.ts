// vega example: View: Finalize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: Finalizing a View',
  summary:
    'A bar driven by a spec timer and a counter of window pings: view.finalize() freezes the bar and makes later pings go unheard, and a button starts a fresh view in the same container.',
  section: 'View API',
  tags: ['view.finalize', 'signal.on', 'event.timer', 'event.window'],
  docs: ['repo/docs/docs/api/view.md', 'repo/docs/docs/signals.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
