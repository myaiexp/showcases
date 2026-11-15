// A custom property reads without -- and its unit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dollar: custom properties as variables",
  summary: "--step: 10% becomes step = 10 inside $(), so $%(step * @i) is a width that grows by one step per row. Change the property and the expression follows.",
  section: "Values",
  tags: ["$%","--step","@i"],
  docs: ["pages/css-doodle-com/reference/function-dollar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
