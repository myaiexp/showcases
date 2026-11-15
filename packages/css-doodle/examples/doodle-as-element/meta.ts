// @doodle in @content: a nested element instead of an image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '@doodle as an element in @content',
  summary:
    "With @content instead of background, the nested code is inserted as a real <css-doodle> element rather than rendered to an image, so its 25 cells are elements of their own and stay interactive. Each cell is clipped to a random triangle: @m3.M2.r(100%) repeats two random percentages three times as the polygon's points.",
  section: 'Nested doodles',
  tags: ["@doodle", "@content", "@m", "@M", "clip-path"],
  docs: ["pages/css-doodle-com/reference/function-doodle.md", "pages/css-doodle-com/reference/property-content.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
