// u_time: an animated spiral from atan and length
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "u_time: an animated spiral from atan and length",
  summary: "u_time is the time in seconds, and a shader that reads it is redrawn every frame. The color is a cosine palette of the angle and radius around the middle, moving with time.",
  section: "Shaders",
  tags: ["@shaders", "u_time", "pos", "atan"],
  docs: ['pages/css-doodle-com/reference/function-shaders.md', 'repo/docs/languages.md', 'repo/docs/grammar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
