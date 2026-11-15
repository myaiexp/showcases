// galacean example: Joint mass scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Joint mass scale",
  summary:
    "A light ball tied by a SpringJoint to a block ten times heavier is thrown away. The joint's massScale shrinks the main body's mass in the constraint (1, 0.3 then 0.05), so the block is dragged further the smaller the scale.",
  section: "Physics",
  tags: ['Joint.massScale', 'Joint.connectedMassScale', 'SpringJoint'],
  docs: [
    'repo/docs/en/physics/joint/overview.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
