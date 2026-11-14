// playcanvas example: Static, dynamic and kinematic bodies
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Static, dynamic and kinematic bodies',
  summary:
    'The three rigidbody types side by side. A static ledge never moves, dynamic crates fall and tumble under physics, and a kinematic platform follows setPosition each frame, carrying the crates resting on it and pushing the ones it meets without being pushed back. Crates are respawned with teleport.',
  section: 'Physics',
  tags: ['rigidbody', 'collision', 'type', 'teleport'],
  docs: ['repo/docs/user-manual/physics/rigid-bodies.md', 'repo/docs/user-manual/editor/scenes/components/rigidbody.md', 'repo/docs/user-manual/physics/forces-and-impulses.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
