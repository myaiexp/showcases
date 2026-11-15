// @doodle.wrap(): a 100px tile that repeats without seams
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Seamless tiles with @doodle.wrap()',
  summary:
    '@doodle.wrap() makes a tile that repeats without seams: circles placed at random in a 100 px tile wrap around its edges, so where one is cut on the right it continues on the left, and the repeated background shows no joins. The image keeps its own size, so it repeats every 100 px.',
  section: 'Nested doodles',
  tags: ["@doodle", "wrap", "seamless", "@place", "@size"],
  docs: ["pages/css-doodle-com/reference/function-doodle.md", "repo/docs/grammar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
