// Pizzicato.js example: Flanger's swirling sweep on a held note
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Jet plane swoosh',
  summary:
    'A held note through a Flanger: a copy of the sound, delayed by a few thousandths of a second that wobble back and forth, makes the tone swirl like a jet passing. The bar shows the copy\'s delay drifting.',
  section: 'Effects',
  tags: ['Flanger', 'time', 'speed', 'depth', 'feedback', 'mix'],
  docs: ['repo/README.md', 'repo/src/Effects/Flanger.js', 'repo/src/Util.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
