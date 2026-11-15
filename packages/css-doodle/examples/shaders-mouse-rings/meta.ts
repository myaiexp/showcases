// u_mouse: rings that follow the pointer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "u_mouse: rings that follow the pointer",
  summary: "u_mouse is the pointer position in device pixels, from the bottom-left corner, and a shader that reads it is redrawn every frame. Rings radiate from the pointer. In a card the pointer is faked with moves along a circle; in the full view move your own over it.",
  section: "Shaders",
  tags: ["@shaders", "u_mouse", "u_time", "u_resolution"],
  docs: ['pages/css-doodle-com/reference/function-shaders.md', 'repo/docs/languages.md', 'repo/docs/grammar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
