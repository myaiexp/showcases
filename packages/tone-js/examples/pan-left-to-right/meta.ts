// tone-js example: Sweep a sound from left to right
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sweep a sound from left to right",
  summary:
    "Tone.Panner places a mono sound between the speakers: -1 is all left, 0 is centre, 1 is all right. A riff sweeps across the stereo field while a dot follows the pan value.",
  section: "Channels and routing",
  tags: ["Panner", "pan", "linearRampToValueAtTime"],
  docs: ["repo/Tone/component/channel/Panner.ts", "repo/Connections.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
