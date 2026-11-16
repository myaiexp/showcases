// leafer-ui example: Hit: hitSelf false lets the pointer through a Box
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hit: hitSelf false lets the pointer through a Box",
  summary: "hitSelf: false stops a Box responding on its own area while its children still do. A drag in the empty part of the blue Box moves it, or does nothing when hitSelf is off; the yellow circle always drags.",
  section: "Interaction",
  tags: ["hitSelf","Box","draggable"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/hitSelf.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
