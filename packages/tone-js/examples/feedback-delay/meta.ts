// tone-js example: Echoes that repeat and fade
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Echoes that repeat and fade",
  summary:
    "Tone.FeedbackDelay repeats a sound after a delay time and feeds part of each repeat back in, so the echoes die away. More feedback, more repeats.",
  section: 'Effects',
  tags: ['FeedbackDelay', 'delayTime', 'feedback', 'wet'],
  docs: ['repo/Tone/effect/FeedbackDelay.ts', 'repo/Tone/effect/FeedbackEffect.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
