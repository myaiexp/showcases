// pos: the centered position keeps circles round on any shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "pos: the centered position keeps circles round on any shape",
  summary: "An undeclared pos is the centered position, with the shorter side from -0.5 to 0.5, so a circle stays round on a 16:9 image. The disc and ring here move on a Lissajous path, in a wide frame.",
  section: "Shaders",
  tags: ["@shaders", "pos", "u_time", "mix"],
  docs: ['pages/css-doodle-com/reference/function-shaders.md', 'repo/docs/languages.md', 'repo/docs/grammar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
