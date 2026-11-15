// zephyr3d example: Rope and spring joints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rope and spring joints',
  summary:
    'Rope and spring both join a point on the body (anchor) to a point in the world (connectedAnchor). The rope allows any distance up to length and goes slack; the spring stretches around its length with stiffness and damping (sliders in the full view).',
  section: 'Physics',
  tags: ['Joint', 'rope', 'spring', 'anchor', 'connectedAnchor', 'length', 'stiffness', 'damping'],
  docs: ['repo/apps/doc/web/en/physics-joints.md', 'repo/apps/doc/src/tut-79/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
