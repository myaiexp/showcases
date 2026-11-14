// tone-js example: Echo that bounces left and right
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Echo that bounces left and right",
  summary:
    "Tone.PingPongDelay sends the first echo to one speaker and the next to the other. The two traces show each hit answered from alternating sides.",
  section: 'Effects',
  tags: ['PingPongDelay', 'delayTime', 'feedback', 'wet'],
  docs: ['repo/Tone/effect/PingPongDelay.ts', 'repo/Tone/effect/StereoXFeedbackEffect.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
