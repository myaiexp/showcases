// babylon-js example: PhysicsHelper explosion and gravity well
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PhysicsHelper explosion and gravity well',
  summary:
    'A box pyramid hit by PhysicsHelper.applyRadialExplosionImpulse (radius, strength and Linear or Constant falloff), then pulled towards a point by a gravitationalField event that is enabled, disabled and disposed.',
  section: 'Physics',
  tags: ['PhysicsHelper', 'applyRadialExplosionImpulse', 'gravitationalField', 'PhysicsRadialImpulseFalloff'],
  docs: ['repo/content/features/featuresDeepDive/physics/v2/forces.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
