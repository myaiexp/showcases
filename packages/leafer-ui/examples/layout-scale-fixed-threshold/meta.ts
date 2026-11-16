// leafer-ui example: Layout: scaleFixed with a number
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout: scaleFixed with a number",
  summary:
    "scaleFixed: 0.5 holds the element at full size until the view drops below 0.5, then it shrinks with it. The three squares use false, 0.5 and 'zoom-in'.",
  section: "Layout",
  tags: ["scaleFixed","worldTransform"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/scaleFixed.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
