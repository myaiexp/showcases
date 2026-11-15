// @code(65, 66) gives A,B
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Code: several code units",
  summary: "Several arguments give several characters separated by commas, so @code(65, 66) is A,B. Counting the cells by @i from 65 spells the alphabet. Values above 65535 wrap, so emoji code points do not work.",
  section: "Values",
  tags: ["@code","@i","@content"],
  docs: ["pages/css-doodle-com/reference/function-code.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
