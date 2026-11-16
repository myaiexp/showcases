// fabric example: Serialization: canvas.toJSON beside the canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Serialization: canvas.toJSON beside the canvas',
  summary:
    'canvas.toJSON() returns a plain object holding the background and every object as properties; the pane next to the canvas prints it again after each drag, scale or rotation.',
  section: 'Serialization',
  tags: ['toJSON', 'toObject', 'backgroundColor', 'object:modified'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
