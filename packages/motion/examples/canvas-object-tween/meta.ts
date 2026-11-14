// motion example: Canvas ball driven by a plain object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A canvas ball driven by a plain object',
  summary: 'A ball glides, grows and changes colour on a canvas. The ball is nothing but an object with x, y, radius and colour; animate() changes its numbers and colour, and you draw the object each frame. Click the canvas to send it somewhere new.',
  section: 'animate',
  tags: ['animate', 'objects', 'onUpdate', 'canvas', 'colour', 'spring'],
  docs: ['pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
