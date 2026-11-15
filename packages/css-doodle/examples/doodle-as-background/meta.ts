// @doodle(): a nested doodle rendered to an image for background
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '@doodle as a background image',
  summary:
    "A doodle inside a doodle: each of the nine outer cells gets a background that is a complete 4 × 4 doodle, rendered to an image. The nested grid is sized in percentages so it fills whatever it is drawn into, and it draws from the parent's random sequence, so every cell's picks differ.",
  section: 'Nested doodles',
  tags: ["@doodle", "background", "nested"],
  docs: ["pages/css-doodle-com/reference/function-doodle.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
