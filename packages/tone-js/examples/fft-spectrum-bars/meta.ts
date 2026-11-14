// tone-js example: See a sound as spectrum bars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "See a sound as spectrum bars",
  summary:
    "Tone.FFT splits a sound into frequency bins and getValue() returns each one's loudness in decibels, ready to draw as bars. A sine is a single bar, a sawtooth a whole comb of harmonics.",
  section: "Analysis",
  tags: ["FFT", "getValue", "size", "smoothing", "getFrequencyOfIndex"],
  docs: ["repo/Tone/component/analysis/FFT.ts", "repo/Tone/component/analysis/MeterBase.ts", "repo/Tone/component/analysis/Analyser.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
