// Tone.js example: play a Synth from on-screen keys and switch its waveform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Playable synth',
  summary:
    'A Tone.Synth on a keyboard. The waveform picks the colour of the sound: sine is pure and round, triangle soft, square hollow like an old game console, sawtooth bright and buzzy.',
  section: 'Instruments',
  tags: ['Synth', 'oscillator.type', 'triggerAttackRelease'],
  docs: ['repo/README.md', 'repo/Instruments.md', 'repo/Tone/instrument/Synth.ts', 'repo/Sources.md'],
  provenance: 'pure',
  added: '2026-06-14',
});
