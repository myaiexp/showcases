// Pizzicato.js example: the loop option of a file sound
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Loop a file',
  summary:
    "A file sound with loop: true starts again each time it reaches the end, so a short recording becomes a backing track. Watch the playhead wrap round, or stop at the end with loop off. The loop flag is read on every play(), so toggle it, then play again.",
  section: 'Create a sound',
  tags: ['Sound', "source: 'file'", 'loop', 'path'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
