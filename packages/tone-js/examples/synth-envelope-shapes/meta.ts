// Tone.js example: Pluck, pad or organ from one envelope
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pluck, pad or organ from one envelope',
  summary:
    'The same sawtooth becomes a plucked string, a slow swelling pad or an organ just by changing its attack, decay, sustain and release. Drag the four sliders on a Tone.Synth to shape the note yourself.',
  section: 'Instruments',
  tags: ['Synth', 'envelope', 'attack', 'decay', 'sustain', 'release', 'set'],
  docs: ['repo/Envelope.md', 'repo/Instruments.md', 'repo/Tone/instrument/Synth.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
