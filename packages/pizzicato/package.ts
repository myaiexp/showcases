// Pizzicato.js: friendly Web Audio wrapper for sounds and effect chains
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Pizzicato.js',
  npm: 'pizzicato',
  tagline: 'A friendly Web Audio wrapper for generating sounds and chaining effects.',
  about:
    'Pizzicato reduces the Web Audio API to two ideas: sounds and effects. A sound can come from an oscillator wave, a file or the microphone; effects like delay, distortion and tremolo are objects you add to and remove from the chain on the fly. It is tiny and unopinionated, ideal for generating a tone or adding a quick effect without learning the whole audio graph.',
  category: 'Audio',
  homepage: 'https://alemangui.github.io/pizzicato/',
  docsUrl: 'https://alemangui.github.io/pizzicato/',
  repo: 'https://github.com/alemangui/pizzicato',
  added: '2026-06-14',
  sections: ['Basics'],
});
