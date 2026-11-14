// Tone.js example: a Convolver with an impulse response made in code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Build a room out of fading noise',
  summary:
    'A Convolver stamps any sound with the character of an impulse response, a recording of a space reacting to a click. Here the response is just random noise that fades out, generated in code: longer fade, bigger room.',
  section: 'Filters',
  tags: ['Convolver', 'buffer', 'ToneAudioBuffer', 'fromArray', 'normalize'],
  docs: ['repo/Tone/component/filter/Convolver.ts', 'repo/Tone/core/context/ToneAudioBuffer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
