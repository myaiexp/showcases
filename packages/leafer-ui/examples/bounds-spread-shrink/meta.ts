// leafer-ui example: Bounds: spread and shrink
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bounds: spread and shrink",
  summary: "spread(n) grows a bounds on all sides, shrink(n) pulls them in; both take one number or the four-number forms [top, right, bottom, left]. Calls chain, so the result of each step is drawn.",
  section: "Utilities",
  tags: ["Bounds", "spread", "shrink", "IFourNumber", "clone"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/math/Bounds.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
