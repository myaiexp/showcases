// Pizzicato.js example: volume, attack and release given when a sound is created
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Soft pad or plucky blip',
  summary:
    'Attack is how long a note takes to fade in after play(), release how long it takes to fade out after stop(). Near zero both give a game-style blip; a slow attack and long release give a soft pad. The card plays the same note both ways, and the full view has sliders.',
  section: 'Create a sound',
  tags: ['Sound', 'attack', 'release', 'volume', "source: 'wave'"],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
