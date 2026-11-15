// A vertex section replaces the default vertex shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A vertex section replaces the default vertex shader",
  summary: "A vertex section needs its own #version 300 es line and reads the canvas corners from in vec4 position. This one shrinks the quad a little and passes the position on to the fragment shader, which draws a gradient on it.",
  section: "Shaders",
  tags: ["@shaders", "vertex", "fragment", "position"],
  docs: ['pages/css-doodle-com/reference/function-shaders.md', 'repo/docs/languages.md', 'repo/docs/grammar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
