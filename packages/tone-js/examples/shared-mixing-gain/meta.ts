// tone-js example: Mix several sounds through one shared effect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mix several sounds through one shared effect",
  summary:
    "A Tone.Gain is a mixing point: bass, keys and lead each get their own fader Gain, and all three feed one more Gain that goes into a single echo. One effect serves every part instead of one per part.",
  section: "Channels and routing",
  tags: ["Gain", "FeedbackDelay", "connect", "fan-in"],
  docs: ["repo/Tone/core/context/Gain.ts", "repo/Connections.md", "repo/README.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
