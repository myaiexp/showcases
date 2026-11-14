// tone-js example: Swap left and right with Split and Merge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Swap left and right with Split and Merge",
  summary:
    "A Tone.Split pulls a stereo sound apart into its two channels and a Tone.Merge puts them back. Connect output 0 to input 1 and output 1 to input 0, and everything on the left comes out of the right.",
  section: "Channels and routing",
  tags: ["Split", "Merge", "connect", "outputNumber", "inputNumber"],
  docs: ["repo/Connections.md", "repo/Tone/core/context/ToneAudioNode.ts", "repo/Tone/component/channel/Split.ts", "repo/Tone/component/channel/Merge.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
