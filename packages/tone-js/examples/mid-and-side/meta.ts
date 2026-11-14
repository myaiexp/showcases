// tone-js example: Pull a stereo sound apart into mid and side
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pull a stereo sound apart into mid and side",
  summary:
    "MidSideSplit separates what both ears share (mid) from what differs between them (side); MidSideMerge joins them again. Hear the centre bass alone, the left and right notes alone, or push the side up to widen the picture.",
  section: "Channels and routing",
  tags: ["MidSideSplit", "MidSideMerge", "mid", "side", "Gain"],
  docs: ["repo/Tone/component/channel/MidSideSplit.ts", "repo/Tone/component/channel/MidSideMerge.ts", "repo/Tone/component/channel/Split.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
