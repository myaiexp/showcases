// aframe example: setObject3D and removeObject3D with a THREE.PointLight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'setObject3D and removeObject3D with a THREE.PointLight',
  summary:
    'The docs\' pointlight component sets a THREE.PointLight on its entity and removes it when the component goes. The light slides past two boxes; removing it darkens them, and light.el points back at the entity.',
  section: 'Introduction',
  tags: ['setObject3D', 'getObject3D', 'removeObject3D', 'THREE.PointLight', 'el'],
  docs: ['repo/docs/introduction/developing-with-threejs.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
