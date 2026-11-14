// Tone.js example: connect a plain Web Audio node between Tone.js nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plug in a plain Web Audio node',
  summary:
    "Tone.js runs on the browser's own Web Audio API, so its nodes connect to plain ones. A native BiquadFilterNode, made from Tone's rawContext and joined with Tone.connect, sweeps a synth from muffled to bright.",
  section: 'Context',
  tags: ['getContext', 'rawContext', 'connect', 'BiquadFilterNode'],
  docs: ['repo/AudioContext.md', 'repo/Tone/core/context/ToneAudioNode.ts', 'repo/Connections.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
