// zephyr3d example: initialLinearVelocity and initialAngularVelocity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'initialLinearVelocity and initialAngularVelocity',
  summary:
    'Bodies that start out moving without a script: balls launched at 30, 45 and 60 degrees and a box spinning one turn a second. The velocity applies once, when the body is first built.',
  section: 'Physics',
  tags: ['initialLinearVelocity', 'initialAngularVelocity', 'RigidBody'],
  docs: ['repo/apps/doc/web/en/physics-intro.md', 'repo/apps/doc/src/tut-76/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
