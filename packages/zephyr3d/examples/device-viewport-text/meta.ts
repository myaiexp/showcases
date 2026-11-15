// zephyr3d example: Viewports, scissor and drawText
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Viewports, scissor and drawText',
  summary:
    'One cube drawn into the four quarters of the screen. Each quarter sets its own viewport and scissor rectangle and is cleared separately; getViewport reads the state back and drawText overlays a label.',
  section: 'Device API',
  tags: ['setViewport', 'setScissor', 'getViewport', 'clearFrameBuffer', 'setFont', 'drawText', 'getDrawingBufferWidth'],
  docs: ['repo/apps/doc/web/en/drawcall.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
