// Tone.js example: FeedbackCombFilter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Turn drums into a ringing, tuned buzz',
  summary:
    'A FeedbackCombFilter feeds a sound back into itself after a few milliseconds, so every hit rings at the pitch of that delay. Shorter delay, higher ring; more resonance, longer ring.',
  section: 'Filters',
  tags: ['FeedbackCombFilter', 'delayTime', 'resonance'],
  docs: ['repo/Tone/component/filter/FeedbackCombFilter.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
