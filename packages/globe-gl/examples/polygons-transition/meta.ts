// globe-gl example: Polygons: transition duration
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygons: transition duration",
  summary:
    "Every 3.5 seconds each country is given a new random altitude, and polygonsTransitionDuration sets how long the cones take to rise or sink. A slider changes the duration and a button re-rolls at once.",
  section: "Polygons Layer",
  tags: ["polygonsTransitionDuration", "polygonAltitude"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
