// Tone.js example: Tone.start() unlocks a page's audio after a click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Unlock sound with a click',
  summary:
    'Browsers keep a page silent until you click something: the audio context starts "suspended". Calling Tone.start() from a click switches it to "running", and only then can anything be heard.',
  section: 'Getting started',
  tags: ['Tone.start', 'getContext', 'state', 'autoplay'],
  docs: ['repo/README.md', 'repo/Autoplay.md', 'repo/Tone/core/Global.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
