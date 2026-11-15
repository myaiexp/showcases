// galacean example: UI event bubbling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI event bubbling",
  summary:
    "Three nested squares log their pointer events: down, up and click bubble from the one hit through its ancestors, enter and exit fire for each element the pointer crosses instead of bubbling. A scripted pointer drives the card; use your own in the full view.",
  section: "UI",
  tags: ['onPointerDown', 'onPointerUp', 'onPointerClick', 'onPointerEnter', 'onPointerExit'],
  docs: [
    'repo/docs/en/UI/quickStart/event.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
