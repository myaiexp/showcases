// aframe example: Guide: a scale-on-mouseenter component with an a-cursor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Guide: a scale-on-mouseenter component with an a-cursor',
  summary:
    'An <a-camera> holding an <a-cursor> aims at things; the guide\'s scale-on-mouseenter component grows the box when the cursor\'s ray enters it, writing straight to object3D.scale. Drag to look at the box.',
  section: 'Guides',
  tags: ['a-camera', 'a-cursor', 'mouseenter', 'registerComponent', 'vec3', 'object3D.scale'],
  docs: ['repo/docs/guides/building-a-basic-scene.md', 'repo/docs/components/cursor.md', 'repo/docs/primitives/a-cursor.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
