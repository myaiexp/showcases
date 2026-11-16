// leafer-ui example: ChildEvent: add, remove and the life events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ChildEvent: add, remove and the life events",
  summary: "add and remove reach the child, then the parent, then the Leafer; created, mounted, unmounted and destroy only reach the element itself. The log shows the order as a rect is added to a group, removed and destroyed.",
  section: "Events",
  tags: ["ChildEvent.ADD", "ChildEvent.REMOVE", "ChildEvent.CREATED", "ChildEvent.MOUNTED", "ChildEvent.UNMOUNTED", "ChildEvent.DESTROY"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/basic/Child.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
