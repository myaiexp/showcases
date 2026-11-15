// galacean example: Trigger shape versus solid shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Trigger shape versus solid shape",
  summary:
    "Balls fall onto two translucent-looking blocks: the left shape is solid and the balls bounce off it, the right shape has isTrigger = true and they pass through, flashing white while inside, because a trigger raises events only.",
  section: "Physics",
  tags: ['ColliderShape.isTrigger', 'onTriggerEnter', 'onTriggerExit'],
  docs: [
    'repo/docs/en/physics/collider/colliderShape.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
