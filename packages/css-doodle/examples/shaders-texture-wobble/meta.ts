// texture0 { … }: a doodle bound as a sampler2D
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "texture0 { … }: a doodle bound as a sampler2D",
  summary: "A section named texture0 holds doodle code, rendered at the size of the shader and bound as a sampler2D of the same name. The shader then goes in a fragment section; this one reads the colored grid with a sine wobble across x.",
  section: "Shaders",
  tags: ["@shaders", "fragment", "texture0", "sampler2D", "u_time"],
  docs: ['pages/css-doodle-com/reference/function-shaders.md', 'repo/docs/languages.md', 'repo/docs/grammar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
