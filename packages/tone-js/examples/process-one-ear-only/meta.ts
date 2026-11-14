// tone-js example: Process the left and right ears separately
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Process the left and right ears separately",
  summary:
    "Tone.Split gives each channel of a stereo sound its own output, so an effect can treat one ear and leave the other alone. Here only one side goes through a lowpass filter before a Tone.Merge joins them again.",
  section: "Channels and routing",
  tags: ["Split", "Merge", "Filter", "connect"],
  docs: ["repo/Tone/component/channel/Split.ts", "repo/Tone/component/channel/Merge.ts", "repo/Connections.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
