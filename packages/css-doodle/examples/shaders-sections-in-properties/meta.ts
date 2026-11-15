// Sections in custom properties: --fragment: @raw(…) and --texture: @doodle(…)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sections in custom properties: --fragment: @raw(…) and --texture: @doodle(…)",
  summary: "$name anywhere in the body inserts the text of the custom property --name. GLSL lives in --fragment: @raw(…), and a texture section whose whole body is $name draws the doodle in --name: @doodle(…), which reads the outer --c.",
  section: "Shaders",
  tags: ["@shaders", "$name", "@raw", "@doodle", "fragment"],
  docs: ['pages/css-doodle-com/reference/function-shaders.md', 'repo/docs/languages.md', 'repo/docs/grammar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
