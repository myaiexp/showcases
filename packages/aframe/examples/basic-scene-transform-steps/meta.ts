// aframe example: Guide: the box at the origin, then rotated, scaled and placed in front
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Guide: the box at the origin, then rotated, scaled and placed in front',
  summary:
    'Step through the guide\'s box. At the origin it hides inside the default camera, rotation and scale change its look, and position="0 2 -5" moves it five metres in front and two up so it is visible.',
  section: 'Guides',
  tags: ['a-box', 'position', 'rotation', 'scale', 'default camera'],
  docs: ['repo/docs/guides/building-a-basic-scene.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
