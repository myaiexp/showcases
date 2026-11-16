// aframe example: Best practices: closure helpers reused across ticks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Best practices: closure helpers reused across ticks',
  summary:
    'Three spheres share one helper Vector3, Quaternion and Color made once in a closure on the component, instead of allocating new ones every frame in tick.',
  section: 'Introduction',
  tags: ['tick', 'garbage collection', 'closure', 'THREE.Vector3', 'THREE.Quaternion'],
  docs: ['repo/docs/introduction/best-practices.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
