// galacean example: Dynamic collider: sleepThreshold, sleep, wakeUp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: sleepThreshold, sleep, wakeUp",
  summary:
    "Three balls roll with sleepThreshold 0.005, 0.5 and 2: the higher the threshold, the earlier the body falls asleep (it greys out). The full view adds sleep() and wakeUp() buttons.",
  section: "Physics",
  tags: ['DynamicCollider.sleepThreshold', 'DynamicCollider.isSleeping', 'DynamicCollider.sleep', 'DynamicCollider.wakeUp'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
