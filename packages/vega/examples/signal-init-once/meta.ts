// vega example: Signal: init Runs Once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Signal: init Runs Once',
  summary:
    'A start time set by an init expression stays fixed while a timer-driven signal counts elapsed seconds beside it and a bar sweeps across.',
  section: 'Signals',
  tags: ['signal.init', 'signal.on', 'event.timer'],
  docs: ['repo/docs/docs/signals.md', 'repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
