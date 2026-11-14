// Tone.js example: Fade a sampled sound in or let it ring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fade a sampled sound in or let it ring',
  summary:
    'A Tone.Sampler can fade each note in with attack and fade it out with release when the key lifts: a hard stop, a swell, or a long ring. The recording is a stand-in chord rendered in code.',
  section: 'Instruments',
  tags: ['Sampler', 'attack', 'release', 'curve'],
  docs: ['repo/Tone/instrument/Sampler.ts', 'repo/Instruments.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
