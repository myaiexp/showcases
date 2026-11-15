// galacean example: Script: onCollisionEnter, Stay and Exit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Script: onCollisionEnter, Stay and Exit",
  summary:
    "A ball dropped on a floor bounces: onCollisionEnter fires on each landing, onCollisionStay while it rests on the floor and onCollisionExit when it leaves, with the contact count read from the Collision.",
  section: "Script",
  tags: ['Script', 'onCollisionEnter', 'onCollisionStay', 'onCollisionExit', 'Collision', 'DynamicCollider'],
  docs: [
    'repo/docs/en/script/class.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
