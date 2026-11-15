// A texture section that is only $name: a nested @doodle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A texture section that is only $name: a nested @doodle",
  summary: "A texture body that is only $name draws the doodle stored in --name: @doodle(…), which reads the outer variables like any nested doodle. The variable --c holds the colors, and the pattern wobbles the coordinates it samples with.",
  section: "Patterns",
  tags: ["@pattern", "texture", "$name", "@doodle"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
