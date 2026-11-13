// Tone.js: Web Audio framework for synths, effects and musical scheduling
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Tone.js',
  npm: 'tone',
  tagline: 'A Web Audio framework for synths, effects and a musical Transport, with no audio files.',
  about:
    'The raw Web Audio API is powerful but low-level: you wire oscillators, gain nodes and sample-accurate timing by hand. Tone.js wraps it in musical concepts: synths you play with note names like "C4", a Transport that schedules events on a timeline of bars, beats and BPM, and a library of effects. Everything is synthesized live in the browser.',
  category: 'Audio',
  homepage: 'https://tonejs.github.io',
  docsUrl: 'https://tonejs.github.io',
  repo: 'https://github.com/Tonejs/Tone.js',
  added: '2026-06-14',
  sections: ['Basics'],
});
