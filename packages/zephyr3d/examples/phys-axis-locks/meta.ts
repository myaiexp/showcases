// zephyr3d example: Axis locks: lockRotation and lockTranslation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis locks: lockRotation and lockTranslation',
  summary:
    'The same ball hits three identical posts: a free one tips over, one with every rotation axis locked can only slide, and one with lockTranslationX cannot move along the push and only spins.',
  section: 'Physics',
  tags: ['lockRotationX', 'lockTranslationX', 'RigidBody'],
  docs: ['repo/apps/doc/web/en/physics-intro.md', 'repo/apps/doc/src/tut-76/main.js', 'repo/apps/doc/web/en/physics-scripting.md', 'repo/apps/doc/src/tut-78/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
