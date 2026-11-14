// tone-js example: Read a slow wobble like a needle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Read a slow wobble like a needle",
  summary:
    "Tone.DCMeter reports the raw value of a signal, positive or negative, not its loudness. An LFO sweeping 200 to 600 steers a siren, and the needle follows the same wobble that Tone.Meter would average away.",
  section: "Analysis",
  tags: ["DCMeter", "LFO", "getValue"],
  docs: ["repo/Tone/component/analysis/DCMeter.ts", "repo/Tone/component/analysis/Meter.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
