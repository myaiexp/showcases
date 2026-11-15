// box and shape: strokes along the edge of a distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "box and shape: strokes along the edge of a distance",
  summary: "box, segment and arc give the distance to a shape, and shape(d, w) turns it into ink: shape(abs(d), w) is a stroke of width w along the edge. Twelve nested boxes are turned by rot() a little more each, and sway with time.",
  section: "Patterns",
  tags: ["@pattern", "box", "shape", "rot", "repeat"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
