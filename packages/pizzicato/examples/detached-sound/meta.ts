// Pizzicato.js example: a detached sound that stays silent until it is wired in
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A detached sound',
  summary:
    'With detached: true a sound plays without being connected to the speakers, so it is silent. Wiring it in yourself with connect(Pizzicato.masterGainNode) makes it audible, and disconnect() silences it again.',
  section: 'Advanced',
  tags: ['detached', 'connect', 'disconnect', 'masterGainNode'],
  docs: ['repo/README.md', 'repo/src/Sound.js', 'repo/src/Pizzicato.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
