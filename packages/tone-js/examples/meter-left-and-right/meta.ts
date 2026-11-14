// tone-js example: Meter the left and right ears separately
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Meter the left and right ears separately",
  summary:
    "Give Tone.Meter channelCount 2 and getValue() returns two decibel levels, one per ear. A riff sweeps from left to right, and the left bar falls while the right one rises. Cards measure a separate silent render of the same sound.",
  section: "Analysis",
  tags: ["Meter", "channelCount", "getValue", "Panner"],
  docs: ["repo/Tone/component/analysis/Meter.ts", "repo/Tone/component/analysis/Analyser.ts", "repo/Tone/component/channel/Panner.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
