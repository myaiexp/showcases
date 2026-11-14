// playcanvas example: How clips bind to nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'How clips bind to nodes',
  summary:
    "A clip names its targets by path, not by reference. One wave clip plays on three rigs with the same node names: a complete one, one that lacks its right arm so those curves are ignored, and one under a holder entity reached through rootBone. Adding the missing node needs anim.rebind() before it waves.",
  section: 'Animation',
  tags: ['AnimTrack', 'AnimCurve', 'AnimComponent', 'rebind', 'rootBone', 'assignAnimation', 'entityPath'],
  docs: [
    'repo/docs/user-manual/animation/clips.md',
    'repo/docs/user-manual/animation/playing-animations.md',
    'repo/docs/user-manual/editor/scenes/components/anim.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
