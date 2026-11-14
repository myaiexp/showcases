// tone-js example: One analyser, two views of a sound
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "One analyser, two views of a sound",
  summary:
    "Tone.Analyser is the node underneath the meters: its type \"waveform\" returns the wave's shape and \"fft\" returns the loudness per frequency. Switch the type and the same sound is drawn two ways.",
  section: "Analysis",
  tags: ["Analyser", "type", "size", "smoothing", "getValue"],
  docs: ["repo/Tone/component/analysis/Analyser.ts", "repo/Tone/component/analysis/FFT.ts", "repo/Tone/component/analysis/Waveform.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
