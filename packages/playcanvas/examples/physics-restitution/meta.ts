// playcanvas example: Restitution multiplies between bodies
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Restitution multiplies between bodies',
  summary:
    'Five balls with restitution 0, 0.3, 0.6, 0.9 and 1 drop onto a floor body. The two restitution values in a contact are multiplied, so the floor\'s own value scales every bounce: at 0 nothing bounces, at 1 the balls return to their drop height. The floor restitution is a live slider.',
  section: 'Physics',
  tags: ['restitution', 'rigidbody', 'teleport'],
  docs: ['repo/docs/user-manual/physics/rigid-bodies.md', 'repo/docs/user-manual/editor/scenes/components/rigidbody.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
