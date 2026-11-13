// Tone.js example: click keys to play notes on a Synth with a selectable waveform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Playable synth',
  summary:
    'Each button triggers a note on a Tone.Synth. Change the oscillator waveform to hear the timbre shift: a sine is pure and round, a sawtooth bright and buzzy.',
  section: 'Basics',
  tags: ['Synth', 'triggerAttackRelease', 'oscillator'],
  docs: [],
  provenance: 'legacy',
  added: '2026-06-14',
  audio: true,
});
