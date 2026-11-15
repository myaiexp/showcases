// u_seed: a color per cell from the seed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "u_seed: a color per cell from the seed",
  summary: "u_seed.x comes from the seed alone and u_seed.y from the seed and the cell, both from 0 to 1. Every cell of a 3 × 3 grid takes its palette from u_seed.x, the same everywhere, and its ring count from u_seed.y, different in each cell. A shader that only reads u_seed draws once; the cards redraw with a new seed.",
  section: "Shaders",
  tags: ["@shaders", "u_seed", "background"],
  docs: ['pages/css-doodle-com/reference/function-shaders.md', 'repo/docs/languages.md', 'repo/docs/grammar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
