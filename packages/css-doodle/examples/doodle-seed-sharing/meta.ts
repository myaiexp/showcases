// Nested doodles draw from the parent's randomness unless they set @seed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Nested doodles and @seed',
  summary:
    "A nested doodle draws from the parent's random sequence, so without its own seed every cell gets a different tile. With @seed in the nested code they all draw the same picks, and css-doodle renders that output once and shares the one image between the cells.",
  section: 'Nested doodles',
  tags: ["@doodle", "@seed", "random"],
  docs: ["pages/css-doodle-com/reference/function-doodle.md", "pages/css-doodle-com/reference/property-seed.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
