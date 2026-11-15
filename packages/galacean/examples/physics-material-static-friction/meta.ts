// galacean example: Material: static friction on a tilting ramp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Material: static friction on a tilting ramp",
  summary:
    "A crate sits on a ramp that slowly tilts. It holds until tan(angle) passes its staticFriction of 0.6 (about 31 degrees) and then slides with the lower dynamicFriction of 0.3.",
  section: "Physics",
  tags: ['PhysicsMaterial.staticFriction', 'PhysicsMaterial.dynamicFriction', 'Transform.setRotation'],
  docs: [
    'repo/docs/en/physics/collider/colliderShape.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
