// tone-js example: Send one sound through two effects at once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Send one sound through two effects at once',
  summary:
    'Connect one source to several effects and they run side by side: here a drum loop feeds a muffling lowpass filter and a Tone.FeedbackDelay together, and you hear both added. Tick the boxes to open and close each path.',
  section: 'Effects',
  tags: ['FeedbackDelay', 'Filter', 'connect', 'toDestination', 'parallel'],
  docs: ['repo/README.md', 'repo/Connections.md', 'repo/Tone/effect/FeedbackDelay.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
