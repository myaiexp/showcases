// Pizzicato.js example: effects added to a playing sound one by one, and taken out again
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Effects rack',
  summary:
    'A short riff keeps playing while effects are plugged in one after another: addEffect() puts each at the end of the chain, removeEffect() takes it out, without stopping the sound. The boxes show what the riff goes through right now.',
  section: 'Using sounds',
  tags: ['addEffect', 'removeEffect', 'Distortion', 'LowPassFilter', 'Tremolo', 'Delay'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-06-14',
});
