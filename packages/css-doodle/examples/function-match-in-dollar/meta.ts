// $(match(...)) with a fallback of 0
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Match: match() inside $()",
  summary: "Inside $() the same idea is written match(condition, value, …, fallback) and the fallback is 0 when left out. It reads the cell variables, so $(match(x = 1, 5, 7)) is 5 in the first column and 7 elsewhere.",
  section: "Values",
  tags: ["$()","match()","@content"],
  docs: ["pages/css-doodle-com/reference/function-match.md","pages/css-doodle-com/reference/function-dollar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
