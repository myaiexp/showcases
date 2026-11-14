// Pizzicato.js example: the volume property turns a playing sound down and up
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A volume knob',
  summary:
    'Every sound has a volume property between 0 (silent) and 1 (full). Set it while the note is playing and the loudness changes at once, like turning a knob. The card steps it down and back up while a loudness bar follows.',
  section: 'Using sounds',
  tags: ['Sound', 'volume', 'wave'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
