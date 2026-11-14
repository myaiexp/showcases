// Pizzicato.js example: a Sound wired to a Web Audio AnalyserNode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Connect a sound to an analyser',
  summary:
    'sound.connect(analyser) hands the sound to a plain Web Audio AnalyserNode, which reports how loud each pitch is. The bars show a wave gliding up an octave: a sine is one peak, a square or sawtooth brings a whole comb of overtones.',
  section: 'Advanced',
  tags: ['connect', 'AnalyserNode', 'createAnalyser', 'context', 'wave'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
