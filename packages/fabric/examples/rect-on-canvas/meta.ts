// fabric example: Objects: Rect on a canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Objects: Rect on a canvas',
  summary:
    'new Canvas(element) wraps a <canvas>; new Rect({...}) makes an object that canvas.add() puts on it. Changing it later is rect.set() plus a render, and the object stays selectable and draggable.',
  section: 'Objects',
  tags: ['Canvas', 'Rect', 'add', 'set', 'requestRenderAll'],
  docs: ['repo/src/content/docs/docs/Old docs/fabric-intro-part-1.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
