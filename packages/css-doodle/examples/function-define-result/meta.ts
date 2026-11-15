// A body of result declarations works like @function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Define: result gives a value",
  summary: "A body made only of result declarations gives the value of the last one. With --double(x): { result: $(x * 2); }, $double(@i) is the index doubled; a second function adds a step and uses the first.",
  section: "Values",
  tags: ["--name()","result","$name()","@content"],
  docs: ["pages/css-doodle-com/reference/function-define.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
