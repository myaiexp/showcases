// aframe example: getAttribute: values, and live Vector3s for position and scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'getAttribute: values, and live Vector3s for position and scale',
  summary:
    'getAttribute returns objects and booleans rather than strings. position comes back as the very Vector3 of object3D, so editing it moves the entity, while rotation is a plain degrees object separate from the radians Euler.',
  section: 'Introduction',
  tags: ['getAttribute', 'position', 'rotation', 'object3D', 'Vector3'],
  docs: ['repo/docs/introduction/javascript-events-dom-apis.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
