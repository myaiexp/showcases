// fabric example: Extensions: AligningGuidelines options and custom drawing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensions: AligningGuidelines options and custom drawing',
  summary:
    'The AligningGuidelines options from its README live on a canvas: margin, width, color, lineDash and xSize, plus replacing drawX with round end markers and drawLine with a Bézier curve.',
  section: 'Extensions',
  tags: ['AligningGuidelines', 'margin', 'lineDash', 'xSize', 'drawLine', 'drawX', 'getTopContext'],
  docs: [
    'repo/extensions/aligning_guidelines/README.MD',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
