// Pizzicato.js example: the order effects are added in changes the sound
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Effect order matters',
  summary:
    'The same two effects, added in a different order, sound different. Fuzz first then a LowPassFilter rounds off the harsh edges; filter first then fuzz squashes the muffled sound into a harsh buzz. Effects run in the order you addEffect() them.',
  section: 'Effects',
  tags: ['addEffect', 'removeEffect', 'Distortion', 'LowPassFilter'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
