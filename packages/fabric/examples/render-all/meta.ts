// fabric example: Canvas: renderAll and requestRenderAll
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas: renderAll and requestRenderAll',
  summary:
    'renderAll() draws immediately and every call draws again, while requestRenderAll() schedules one draw however often it is called; after:render counts them.',
  section: 'Canvas',
  tags: ['renderAll', 'requestRenderAll', 'renderOnAddRemove', 'after:render'],
  docs: ['repo/src/content/docs/api/classes/Canvas.md', 'repo/src/content/docs/api/classes/StaticCanvas.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
