// tone-js example: Chain effects in a line or fan them out
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Chain effects in a line or fan them out",
  summary:
    "chain() runs a sound through effects one after another; fan() sends it to all of them side by side. Same riff, same filter and echo, two different wirings: the picture shows which cables are live, and the sound changes with them.",
  section: "Channels and routing",
  tags: ["chain", "fan", "toDestination", "Filter", "FeedbackDelay"],
  docs: ["repo/Connections.md", "repo/README.md", "repo/Tone/core/context/ToneAudioNode.ts", "repo/Tone/core/context/Gain.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
