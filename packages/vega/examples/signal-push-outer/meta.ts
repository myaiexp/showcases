// vega example: Signal: push outer from Nested Groups
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Signal: push outer from Nested Groups',
  summary:
    'Hovering a rect inside either panel updates a signal defined at the top level through push: outer, while a signal defined inside the group stays private to each panel.',
  section: 'Signals',
  tags: ['signal.push', 'signal.on', 'marks.group.signals'],
  docs: ['repo/docs/docs/signals.md', 'repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
