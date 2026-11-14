// tone-js example: Split a sound into bass, mid and treble
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Split a sound into bass, mid and treble",
  summary:
    "Tone.MultibandSplit cuts a signal into low, mid and high outputs at two crossover frequencies. The spectrum below is coloured by band: listen to one band at a time, or drag the crossovers.",
  section: "Channels and routing",
  tags: ["MultibandSplit", "lowFrequency", "highFrequency", "low", "mid", "high"],
  docs: ["repo/Tone/component/channel/MultibandSplit.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
