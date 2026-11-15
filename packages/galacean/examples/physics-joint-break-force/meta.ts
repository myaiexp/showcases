// galacean example: Fixed joint: breakForce
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fixed joint: breakForce",
  summary:
    "Two crates hang from a beam on FixedJoints, one with breakForce Infinity and one with 80. A heavy ball swings into both: the unbreakable joint holds and the weak one snaps, dropping its crate.",
  section: "Physics",
  tags: ['Joint.breakForce', 'FixedJoint', 'DynamicCollider.mass'],
  docs: [
    'repo/docs/en/physics/joint/overview.mdx',
    'repo/docs/en/physics/joint/fixedJoint.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
