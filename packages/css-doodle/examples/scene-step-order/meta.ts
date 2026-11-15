// move, rotate and scale run in the order written
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "move, rotate and scale run in the order written",
  summary: "move, rotate and scale (and grow, frame, mirror, repeat, twist) run in the order written. A box moved then turned swings round the origin; turned then moved it stays in place. The variants show the two orders next to a fixed gray reference box.",
  section: "Scenes",
  tags: ["@scene", "move", "rotate", "scale"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
