// @raw(<b>@i</b>) fills HTML with cell values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Raw: functions still run inside",
  summary: "Function calls in the text are still evaluated, so @i becomes each cell's index inside a <b> element that the cell styles with an ordinary rule. The variants use other functions in the markup.",
  section: "Values",
  tags: ["@raw","@i","@r","@content"],
  docs: ["pages/css-doodle-com/reference/function-raw.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
