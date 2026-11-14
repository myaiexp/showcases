// tone-js example: Duck a pad with an envelope follower
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Duck a pad with an envelope follower",
  summary:
    "Tone.Follower traces how loud a signal is as a smooth control signal. Here it follows a kick drum, is flipped and sent to the gain of a pad, so every kick pushes the pad down: the classic pumping duck.",
  section: "Analysis",
  tags: ["Follower", "Multiply", "DCMeter", "MembraneSynth", "Gain"],
  docs: ["repo/Tone/component/analysis/Follower.ts", "repo/Tone/component/analysis/DCMeter.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
