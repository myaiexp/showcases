// Pizzicato.js example: on('end') starts the next recording when one finishes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A playlist from the end event',
  summary:
    'A file sound fires "end" when it plays through to its last second. Each recording here starts the next one in its end handler: drums, then bass, then keys, with no timer counting seconds.',
  section: 'Using sounds',
  tags: ['Sound', 'on', 'end', 'play', "source: 'file'"],
  docs: ['repo/README.md', 'repo/src/Sound.js', 'repo/src/Events.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
