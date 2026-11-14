// Tone.js example: Bell or brass from the same FM synth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bell or brass from the same FM synth',
  summary:
    'Frequency modulation can ring like a struck bell or blare like a horn, depending on the harmonicity, the modulation index and how the envelopes shape them. Switch between both on one Tone.FMSynth.',
  section: 'Instruments',
  tags: ['FMSynth', 'harmonicity', 'modulationIndex', 'modulationEnvelope', 'envelope'],
  docs: ['repo/Tone/instrument/FMSynth.ts', 'repo/Tone/instrument/ModulationSynth.ts', 'repo/Instruments.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
