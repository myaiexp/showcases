// fabric example: Customization: cursors per object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Customization: cursors per object',
  summary:
    'An object\'s own hoverCursor and moveCursor take over from the canvas ones while the pointer is over it or dragging it. The readout shows the cursor fabric last wrote to the canvas.',
  section: 'Customization',
  tags: ['hoverCursor', 'moveCursor', 'upperCanvasEl', 'hasControls'],
  docs: [
    'repo/src/content/docs/api/classes/FabricObject.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
