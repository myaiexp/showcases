// Tone.js example: FM tone from a modulator
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FM tone from a modulator',
  summary:
    "Tone.FMOscillator wobbles one wave's pitch with a second wave. With no modulation it is a plain sine; turn the modulationIndex up and the tone gains brighter and brighter overtones, from soft to metallic.",
  section: 'Sources',
  tags: ['FMOscillator', 'modulationIndex', 'harmonicity', 'modulationType'],
  docs: ['repo/Sources.md', 'repo/Tone/source/oscillator/FMOscillator.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
