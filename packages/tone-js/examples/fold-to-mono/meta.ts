// tone-js example: Fold a stereo sound down to mono
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fold a stereo sound down to mono",
  summary:
    "Tone.Mono sums a stereo signal and sends the same result to both ears. The two traces on the scope differ in stereo and become identical through Mono: a quick check of how a mix sounds on a single speaker.",
  section: "Channels and routing",
  tags: ["Mono", "Merge", "connect"],
  docs: ["repo/Tone/component/channel/Mono.ts", "repo/Tone/component/channel/Merge.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
