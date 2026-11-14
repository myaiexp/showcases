// vchart example: Events: base pointer and mouse events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: base pointer and mouse events",
  summary:
    "Pointer and mouse event names on bar marks counted side by side: pointerdown, pointerup, pointertap, mousedown, mouseup, click, dblclick and the hover family. A button fires a click at a bar from code; hover and double-click counts need a real pointer.",
  section: "Events",
  tags: ['pointerdown','pointertap','click','dblclick','on'],
  docs: [
    "repo/docs/assets/api/en/API/event.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
