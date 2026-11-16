// aframe example: Best practices: object3D.position vs setAttribute
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Best practices: object3D.position vs setAttribute',
  summary:
    'Times 20000 position updates through setAttribute and through object3D.position.y on two spheres and prints the milliseconds, showing why the docs advise updating position, rotation, scale and visible at the three.js level.',
  section: 'Introduction',
  tags: ['object3D.position', 'setAttribute', 'performance'],
  docs: ['repo/docs/introduction/best-practices.md', 'repo/docs/introduction/javascript-events-dom-apis.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
