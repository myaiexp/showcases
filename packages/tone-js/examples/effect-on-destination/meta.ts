// tone-js example: Put an effect on the whole output
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Put an effect on the whole output',
  summary:
    'Tone.getDestination().chain(...) routes everything the page plays through a master effects chain. Here a drum loop and a melody both get a small-speaker crunch from one distortion and one lowpass, without either source being touched.',
  section: 'Effects',
  tags: ['Destination', 'chain', 'Distortion', 'Filter', 'getDestination'],
  docs: ['repo/Connections.md', 'repo/Tone/core/context/Destination.ts', 'repo/Tone/effect/Distortion.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
