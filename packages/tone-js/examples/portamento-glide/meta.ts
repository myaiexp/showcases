// Tone.js example: Notes that slide into each other
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Notes that slide into each other',
  summary:
    'With portamento set, a note that starts while the last one is still sounding glides to the new pitch instead of jumping. Try a Tone.Synth with no glide, a short one and a long one.',
  section: 'Instruments',
  tags: ['Synth', 'portamento', 'triggerAttack', 'triggerRelease'],
  docs: ['repo/BasicSynth.md', 'repo/Tone/instrument/Monophonic.ts', 'repo/Tone/instrument/Synth.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
