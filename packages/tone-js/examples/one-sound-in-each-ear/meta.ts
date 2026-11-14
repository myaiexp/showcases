// tone-js example: Put a different sound in each ear with Merge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Put a different sound in each ear with Merge",
  summary:
    "Tone.Merge turns separate mono sounds into the channels of one stereo signal. A sine tone goes into input 0 (left) and pink noise into input 1 (right); change the routing to move them both into one ear.",
  section: "Channels and routing",
  tags: ["Merge", "connect", "NoiseSynth", "Synth"],
  docs: ["repo/Tone/component/channel/Merge.ts", "repo/Connections.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
