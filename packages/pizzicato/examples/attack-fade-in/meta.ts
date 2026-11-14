// Pizzicato.js example: the attack property sets how slowly a note fades in
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Attack: fade a note in',
  summary:
    'A sound with a bigger attack swells in slowly instead of starting at full volume, the difference between a plucked string and a bowed one. The card plays one note with three attack values; set the property, then play.',
  section: 'Using sounds',
  tags: ['Sound', 'attack', 'play'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
