// tone-js example: Watch two waves add up on a scope
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Watch two waves add up on a scope",
  summary:
    "Tone.Waveform returns the shape of the sound right now as a list of samples. A 220 Hz and a 330 Hz sine on their own are simple curves; played together their sum is a new repeating shape.",
  section: "Analysis",
  tags: ["Waveform", "getValue", "size", "Oscillator"],
  docs: ["repo/Tone/component/analysis/Waveform.ts", "repo/Tone/component/analysis/MeterBase.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
