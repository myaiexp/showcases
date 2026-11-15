// galacean example: Script: onTriggerEnter, Stay and Exit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Script: onTriggerEnter, Stay and Exit",
  summary:
    "A kinematic ball passes through a trigger zone. onTriggerEnter fires once on entry, onTriggerStay every frame inside and onTriggerExit once on leaving; the zone changes colour and counts.",
  section: "Script",
  tags: ['Script', 'onTriggerEnter', 'onTriggerStay', 'onTriggerExit', 'ColliderShape', 'isTrigger'],
  docs: [
    'repo/docs/en/script/class.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
