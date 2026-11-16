// leafer-ui example: Pen: arc vs drawArc
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pen: arc vs drawArc",
  summary:
    "arc() continues from the previous point, so a connecting line appears; drawArc() and drawEllipse() move to their own start first and stay independent. Toggle to compare.",
  section: "Elements",
  tags: ['Pen', 'arc', 'drawArc', 'drawEllipse'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Pen.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
