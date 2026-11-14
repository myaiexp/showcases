// Pizzicato.js example: one Delay object added to two different sounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One echo for two instruments',
  summary:
    'An effect is an object, so the same Delay can be added to several sounds, and all of them share its echo. A high lead and a low bass take turns; take the Delay off the bass with removeEffect() and only the lead keeps its echoes.',
  section: 'Effects',
  tags: ['Delay', 'addEffect', 'removeEffect'],
  docs: ['repo/README.md', 'repo/src/Sound.js', 'repo/src/Effects/Delay.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
