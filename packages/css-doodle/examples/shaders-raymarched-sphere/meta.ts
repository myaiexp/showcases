// A raymarched sphere in plain GLSL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A raymarched sphere in plain GLSL",
  summary: "The whole shader is hand-written: a ray is cast through each pixel of the centered position, stepped toward a sphere that bobs with u_time, and lit from one side. It is the kind of image @shaders is for, where @scene would use its own shapes.",
  section: "Shaders",
  tags: ["@shaders", "u_time", "pos", "raymarching"],
  docs: ['pages/css-doodle-com/reference/function-shaders.md', 'repo/docs/languages.md', 'repo/docs/grammar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
