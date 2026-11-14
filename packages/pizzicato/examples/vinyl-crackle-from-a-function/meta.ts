// Pizzicato.js example: vinyl crackle written as a script sound
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vinyl crackle from a function',
  summary:
    "A script sound is whatever your function writes into each block of samples. Here that is a faint hiss with sparse random pops that fade fast: the sound of a worn record. The card plays a barely worn and a well-played record; the full view has a wear slider.",
  section: 'Create a sound',
  tags: ['Sound', "source: 'script'", 'audioFunction', 'noise', 'crackle'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
