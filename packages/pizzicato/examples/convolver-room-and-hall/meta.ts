// Pizzicato.js example: Convolver putting a clap into a small room or a big hall
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A clap in a room, then a hall',
  summary:
    'Convolver borrows the echo of a real place: give it a recording of a clap in a room (an "impulse") and any sound is heard as if played there. The two strips are the impulses, a small room and a long hall; the callback fires once the file is loaded.',
  section: 'Effects',
  tags: ['Convolver', 'impulse', 'mix', 'callback'],
  docs: ['repo/README.md', 'repo/src/Effects/Convolver.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
