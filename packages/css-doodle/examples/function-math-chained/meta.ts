// $(abs.sin(@i)) is $(abs(sin(@i)))
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: chained names inside $()",
  summary: "Inside $() the Math names work without @ and can be chained, so abs.sin(@i) is abs(sin(@i)). The cell opacity follows it along the index; the variants chain more names.",
  section: "Values",
  tags: ["$()","abs","sin","opacity"],
  docs: ["pages/css-doodle-com/reference/function-math.md","pages/css-doodle-com/reference/function-dollar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
