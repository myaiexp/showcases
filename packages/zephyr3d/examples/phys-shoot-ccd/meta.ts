// zephyr3d example: Projectiles: setLinearVelocity and ccd
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Projectiles: setLinearVelocity and ccd',
  summary:
    'Small fast balls are fired at a crate wall with setLinearVelocity; ccd stops them passing through a crate between two steps, and a collisionenter handler reads the contact impulse. Click to shoot in the full view.',
  section: 'Physics',
  tags: ['setLinearVelocity', 'ccd', 'collisionenter', 'impulse'],
  docs: ['repo/apps/doc/web/en/physics-scripting.md', 'repo/apps/doc/src/tut-78/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
