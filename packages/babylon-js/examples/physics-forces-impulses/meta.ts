// babylon-js example: Forces versus impulses
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Forces versus impulses',
  summary:
    'Two identical spheres get the same total push: body.applyForce every frame for a burn time on one, a single body.applyImpulse of force times time on the other. Sliders change both, and the readout compares the peak heights.',
  section: 'Physics',
  tags: ['applyForce', 'applyImpulse', 'PhysicsBody', 'mass'],
  docs: ['repo/content/features/featuresDeepDive/physics/v2/forces.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
