// Pretext example: paint layoutWithLines() output to a canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Paint lines to canvas',
  summary:
    'prepareWithSegments() and layoutWithLines() return each line as a string, so a paragraph paints with one ctx.fillText per line. The slider changes maxWidth, and a dashed guide shows it.',
  section: 'Manual line layout',
  tags: ['layoutWithLines', 'canvas', 'fillText', 'lines'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
