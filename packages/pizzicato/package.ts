// Pizzicato.js: friendly Web Audio wrapper for sounds and effect chains
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Pizzicato.js',
  npm: 'pizzicato',
  tagline: 'A friendly Web Audio wrapper for generating sounds and chaining effects.',
  about:
    'Pizzicato reduces the Web Audio API to two ideas: sounds and effects. A sound comes from a wave, a file, the microphone or your own function; effects such as echo, distortion, reverb and tremolo are objects you add to a sound or a group of sounds and take away again while it plays. It is small and plain, ideal for a game\'s sound effects, a notification chime or a quick voice changer without learning the whole audio graph. Cards are silent: each one shows the waveform of what its Play button sounds like.',
  category: 'Audio',
  homepage: 'https://alemangui.github.io/pizzicato/',
  docsUrl: 'https://alemangui.github.io/pizzicato/',
  repo: 'https://github.com/alemangui/pizzicato',
  added: '2026-06-14',
  sections: ['Getting started', 'Create a sound', 'Using sounds', 'Grouping sounds', 'Effects', 'Advanced'],
});
