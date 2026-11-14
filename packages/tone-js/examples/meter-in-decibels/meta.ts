// tone-js example: Read a sound's loudness in decibels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Read a sound's loudness in decibels",
  summary:
    "Tone.Meter listens to a signal and getValue() returns its loudness (RMS) in decibels. Turn the volume down by 12 dB and the reading falls by 12; the smoothing makes it fall slowly but rise at once.",
  section: "Analysis",
  tags: ["Meter", "getValue", "smoothing", "Volume"],
  docs: ["repo/Tone/component/analysis/Meter.ts", "repo/Tone/component/analysis/MeterBase.ts", "repo/Tone/component/channel/Volume.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
