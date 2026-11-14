// Tone.js example: A drum kit from three kinds of synth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A drum kit from three kinds of synth',
  summary:
    'A kick from Tone.MembraneSynth, a snare from NoiseSynth and a hi-hat from MetalSynth, with a tom, played as three patterns or struck on the pads yourself.',
  section: 'Instruments',
  tags: ['MembraneSynth', 'NoiseSynth', 'MetalSynth', 'triggerAttackRelease'],
  docs: ['repo/Tone/instrument/MembraneSynth.ts', 'repo/Tone/instrument/NoiseSynth.ts', 'repo/Tone/instrument/MetalSynth.ts', 'repo/Instruments.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
