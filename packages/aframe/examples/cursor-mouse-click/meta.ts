// aframe example: Cursor with rayOrigin: mouse: click boxes to cycle colours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cursor with rayOrigin: mouse: click boxes to cycle colours',
  summary:
    'A cursor on the scene with rayOrigin: mouse casts its ray from the mouse position, so clicking the canvas emits click on the entity under it. The docs\' cursor-listener component cycles each shape\'s colour and reads the hit point from evt.detail.intersection.',
  section: 'Components',
  tags: ['cursor', 'rayOrigin: mouse', 'raycaster', 'objects', 'click', 'intersection.point'],
  docs: ['repo/docs/components/cursor.md', 'repo/docs/components/raycaster.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
