// Sortable.js example: an archive hint that appears only while a message is in hand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pick-up feedback',
  summary:
    'Messages in an inbox can be dragged into an archive. A status line follows each stage (grabbed, carried, dropped), the held message lifts, and the archive lights up only while something is being carried.',
  section: 'Events',
  tags: ['onChoose', 'onUnchoose', 'onStart', 'onEnd'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
