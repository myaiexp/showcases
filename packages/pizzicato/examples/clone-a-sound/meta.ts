// Pizzicato.js example: clone() copies a sound with its settings and effects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clone a sound for harmony',
  summary:
    'clone() makes a second sound with the same wave, volume, attack and release, and the same effects attached. Here the clone is retuned a fifth higher, and together the two make a simple harmony that shares one echo.',
  section: 'Using sounds',
  tags: ['Sound', 'clone', 'frequency', 'Delay', 'addEffect'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
