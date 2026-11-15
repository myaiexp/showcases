// vega example: Signal: react false Freezes an Update
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Signal: react false Freezes an Update',
  summary:
    'Four readouts of one slider. The live signal follows it, the react: false signal stays at its first value, and a third react: false signal takes a new snapshot only when you click.',
  section: 'Signals',
  tags: ['signal.react', 'signal.update', 'signal.on'],
  docs: ['repo/docs/docs/signals.md', 'repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
