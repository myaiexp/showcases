// vega example: Signal: Handlers with update or encode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Signal: Handlers with update or encode',
  summary:
    'Two kinds of signal handler. One counts rect mouseovers with an update expression; the other has no value and re-runs a mark encode set, so a pressed rect turns orange and a released one green.',
  section: 'Signals',
  tags: ['signal.on', 'signal.on.update', 'signal.on.encode', 'encode'],
  docs: ['repo/docs/docs/signals.md', 'repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
