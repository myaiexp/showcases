// rot(p, a): turning the whole plane by a distance-dependent angle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "rot(p, a): turning the whole plane by a distance-dependent angle",
  summary: "rot(p, a) is the point p turned a radians counterclockwise. Turning pos by an angle that grows with the distance from the center, then drawing plain stripes on the turned point, twists them into a swirl.",
  section: "Patterns",
  tags: ["@pattern", "rot", "pos", "fract"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
