// leafer-ui example: Ellipse: pie chart from sectors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Ellipse: pie chart from sectors",
  summary:
    "A pie chart is one Ellipse per slice: each takes its startAngle and endAngle from the running total of the values, and innerRadius turns it into a donut.",
  section: "Elements",
  tags: ['Ellipse', 'startAngle', 'endAngle', 'innerRadius'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Ellipse.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
