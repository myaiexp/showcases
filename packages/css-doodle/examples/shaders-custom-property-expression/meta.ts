// $name in an expression: --speed: @r(1, 3) feeds the shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "$name in an expression: --speed: @r(1, 3) feeds the shader",
  summary: "--speed: @r(1, 3) gives each of nine cells its own number, and $speed in the shader reads that cell's value, so every cell's rings move at a different speed. The cards redraw with a new seed.",
  section: "Shaders",
  tags: ["@shaders", "$name", "@r", "u_time"],
  docs: ['pages/css-doodle-com/reference/function-shaders.md', 'repo/docs/languages.md', 'repo/docs/grammar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
