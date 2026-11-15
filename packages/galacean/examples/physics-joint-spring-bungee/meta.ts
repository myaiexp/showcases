// galacean example: Spring joint: stiffness and damping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Spring joint: stiffness and damping",
  summary:
    "A ball hangs from a point in the air on a SpringJoint with maxDistance 1.5: it falls, stretches the spring and bounces like a bungee. Stiffness and damping change the pull and how fast the bounce dies; sliders in the full view.",
  section: "Physics",
  tags: ['SpringJoint', 'SpringJoint.stiffness', 'SpringJoint.damping', 'SpringJoint.maxDistance'],
  docs: [
    'repo/docs/en/physics/joint/overview.mdx',
    'repo/docs/en/physics/joint/springJoint.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
