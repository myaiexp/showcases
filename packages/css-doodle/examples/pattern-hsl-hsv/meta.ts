// hsl(h, s, l) and hsv(h, s, v), with spaces for commas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "hsl(h, s, l) and hsv(h, s, v), with spaces for commas",
  summary: "hsl and hsv give a color from channels between 0 and 1, and inside call parentheses a space works as a comma. Both variants paint a disc around the angle: hsv(a .., 1) is vivid, hsl(a, 1, .. ) fades to white at the rim.",
  section: "Patterns",
  tags: ["@pattern", "hsl", "hsv", "atan"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
