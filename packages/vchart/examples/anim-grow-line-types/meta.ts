// vchart example: Line types: growPointsIn, growPointsXIn, growPointsYIn, clipIn
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Line types: growPointsIn, growPointsXIn, growPointsYIn, clipIn",
  summary:
    "Line and area marks have point-growth entrances (all points, x only, y only) and clipIn, which wipes the line into view. The line's own points can be left as they are.",
  section: 'Animation',
  tags: ['animationAppear', 'type', 'growPointsIn', 'growPointsXIn', 'growPointsYIn', 'clipIn'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Configuration_and_Choreography_of_Complex_Animations.md',
    'repo/docs/assets/option/en/animate/mark-animate.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
