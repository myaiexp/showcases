// aframe example: <a-cursor> in the camera: a gaze ring that fuses
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-cursor> in the camera: a gaze ring that fuses',
  summary:
    '<a-cursor> as a child of <a-camera> stays in the middle of the view. With fuse true, looking at an entity for fuse-timeout milliseconds clicks it; objects limits the ray to the .target shapes. The ring shrinks on the fusing event and resets on mouseleave.',
  section: 'Primitives',
  tags: ['a-cursor', 'fuse', 'fuse-timeout', 'objects', 'fusing', 'mouseleave', 'click'],
  docs: ['repo/docs/primitives/a-cursor.md', 'repo/docs/components/cursor.md', 'repo/docs/components/animation.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
