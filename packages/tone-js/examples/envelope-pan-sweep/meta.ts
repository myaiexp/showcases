// Tone.js example: an Envelope controlling pan
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sweep a sound from left to right with an envelope',
  summary:
    'A bare Envelope has no input, only an output between 0 and 1, so it can steer any parameter. Here it is stretched to -1..1 by a Scale and wired to a Panner: the left and right waveforms show the tone travelling.',
  section: 'Envelopes',
  tags: ['Envelope', 'Scale', 'Panner', 'pan', 'connect'],
  docs: ['repo/Envelope.md', 'repo/Tone/component/envelope/Envelope.ts', 'repo/Tone/component/channel/Panner.ts', 'repo/Signals.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
