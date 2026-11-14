// playcanvas example: Building a clip in code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Building a clip in code',
  summary:
    "A clip is an AnimTrack of AnimData keyframes linked by AnimCurves to named targets. Five keys drive a glowing cube's height and the intensity of the lamp inside it, played by an anim component on the beacon entity. The full view switches the interpolation between step, linear and cubic.",
  section: 'Animation',
  tags: ['AnimTrack', 'AnimCurve', 'AnimData', 'AnimComponent', 'assignAnimation', 'INTERPOLATION_STEP', 'INTERPOLATION_LINEAR', 'INTERPOLATION_CUBIC'],
  docs: [
    'repo/docs/user-manual/animation/clips.md',
    'repo/docs/user-manual/animation/playing-animations.md',
    'repo/docs/user-manual/animation/index.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
