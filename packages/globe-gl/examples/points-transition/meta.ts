// globe-gl example: Points: pointsTransitionDuration
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Points: pointsTransitionDuration",
  summary:
    "Every two seconds the points get new values and a new set of cities. pointsTransitionDuration (1000 ms by default) sets how long columns take to reach their new height and width; new ones grow from the ground. At 0 they jump.",
  section: "Points Layer",
  tags: ["pointsTransitionDuration", "pointsData", "pointAltitude"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
