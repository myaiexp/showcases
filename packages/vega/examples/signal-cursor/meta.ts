// vega example: Signal: The cursor Signal
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Signal: The cursor Signal',
  summary:
    'Drag the circle: a signal named cursor keeps the grabbing pointer for the whole drag, even when you leave the circle, and the readout shows its current value.',
  section: 'Signals',
  tags: ['signal.cursor', 'signal.update', 'signal.on'],
  docs: ['repo/docs/docs/signals.md', 'repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
