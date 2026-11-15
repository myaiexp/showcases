// gl_FragCoord and u_resolution: coordinates as color
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "gl_FragCoord and u_resolution: coordinates as color",
  summary: "u_resolution is the canvas size in device pixels, so gl_FragCoord.xy / u_resolution runs from 0 to 1, starting at the bottom-left corner. Writing that position into the color channels shows the axes; the variants swap them, take the distance to the middle, and fold the position into a checker.",
  section: "Shaders",
  tags: ["@shaders", "gl_FragCoord", "u_resolution", "FragColor"],
  docs: ['pages/css-doodle-com/reference/function-shaders.md', 'repo/docs/languages.md', 'repo/docs/grammar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
