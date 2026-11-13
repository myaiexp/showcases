// gsap example: Track direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Track direction',
  summary:
    'A spinning square reports "direction: 1" or "-1" as its playhead moves, and flips every time it is reversed. trackDirection() works even when the tween is only reversed through its parent timeline.',
  section: 'Helper functions',
  tags: ['trackDirection', 'reversed', 'onUpdate', 'totalTime', 'eventCallback'],
  docs: ['pages/gsap-com/docs/v3/HelperFunctions/helpers/trackDirection.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
