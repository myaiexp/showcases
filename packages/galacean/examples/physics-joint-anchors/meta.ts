// galacean example: Joint anchors: where a hinge attaches
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Joint anchors: where a hinge attaches",
  summary:
    "Two bars are pinned to the world by hinges. The left pin sits at the bar's end, so the bar swings down like a pendulum; the right pin sits at its centre, so it only turns. The anchor is in the bar's local space, connectedAnchor in the world.",
  section: "Physics",
  tags: ['Joint.anchor', 'Joint.connectedAnchor', 'Joint.automaticConnectedAnchor', 'HingeJoint.axis'],
  docs: [
    'repo/docs/en/physics/joint/overview.mdx',
    'repo/docs/en/physics/joint/hingeJoint.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
