// gsap example: Image sequence scrub
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image sequence scrub',
  summary:
    'Scroll the box and a canvas flips through 30 frames that were drawn in code, like a video scrubbed by scroll. The imageSequence() helper tweens a frame counter with a scrubbed ScrollTrigger and paints the matching image.',
  section: 'Helper functions',
  tags: ['imageSequence', 'ScrollTrigger', 'scrub', 'canvas', 'scroller'],
  docs: ['pages/gsap-com/docs/v3/HelperFunctions/helpers/imageSequenceScrub.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
