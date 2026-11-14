// playcanvas example: Scene-wide contact listener
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scene-wide contact listener',
  summary:
    'One listener on app.systems.rigidbody receives every contact in the scene as a SingleContactResult with both entities, both world space contact points, the normal and the impulse. Each contact above a threshold is drawn as a line along its normal, longer and redder for harder hits, with app.drawLine, so a shower of mixed shapes lights up where it lands.',
  section: 'Physics',
  tags: ['contact', 'SingleContactResult', 'RigidBodyComponentSystem', 'drawLine', 'impulse'],
  docs: ['repo/docs/user-manual/physics/collision-events.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
