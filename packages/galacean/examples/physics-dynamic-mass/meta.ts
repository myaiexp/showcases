// galacean example: Dynamic collider: mass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: mass",
  summary:
    "The same ball is fired at two identical-looking crates: one of mass 1 and one of mass 12. The light crate is flung away, the heavy one barely shifts, because mass sets how hard it is to change the motion.",
  section: "Physics",
  tags: ['DynamicCollider.mass', 'linearVelocity'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
