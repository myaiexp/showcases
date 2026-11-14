// Tone.js example: Shimmer and growl from amplitude modulation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shimmer and growl from amplitude modulation',
  summary:
    'One oscillator shakes the volume of another, and the ratio between them decides the colour: slow throbbing at low values, metallic bell-like tones at high ones. This is Tone.AMSynth and its harmonicity.',
  section: 'Instruments',
  tags: ['AMSynth', 'harmonicity', 'modulation', 'modulationEnvelope'],
  docs: ['repo/Tone/instrument/AMSynth.ts', 'repo/Tone/instrument/ModulationSynth.ts', 'repo/Instruments.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
