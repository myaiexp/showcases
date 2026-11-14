// Tone.js: Web Audio framework for synths, effects and musical scheduling
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Tone.js',
  npm: 'tone',
  tagline: 'A Web Audio framework for synths, effects and a musical Transport, with no audio files.',
  about:
    'The raw Web Audio API is powerful but low-level: you wire oscillators, gain nodes and sample-accurate timing by hand. Tone.js wraps it in musical concepts: synths you play with note names like "C4", a Transport that schedules events on a timeline of bars, beats and BPM, and a library of effects. Everything here is synthesized live in the browser. Cards are silent: each one shows the waveform of what its Play button sounds like.',
  category: 'Audio',
  homepage: 'https://tonejs.github.io',
  docsUrl: 'https://tonejs.github.io/docs/15.1.22/',
  repo: 'https://github.com/Tonejs/Tone.js',
  added: '2026-06-14',
  sections: [
    'Getting started',
    'Instruments',
    'Sources',
    'Effects',
    'Envelopes',
    'Filters',
    'Dynamics',
    'Channels and routing',
    'Analysis',
    'Signals',
    'Transport',
    'Events',
    'Time',
    'Context',
  ],
});
