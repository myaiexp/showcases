// motion example: Bell that shakes every few seconds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Unread-message bell that shakes now and then',
  summary: 'A notification bell rings in a quick shake, rests for a few seconds, then shakes again until you open the message. repeat makes it come back, repeatDelay sets the rest between shakes so it nudges rather than nags.',
  section: 'animate',
  tags: ['animate', 'repeat', 'repeatDelay', 'keyframes', 'rotate', 'stop'],
  docs: ['pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
