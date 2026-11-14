// vchart example: Events: the four brush events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: the four brush events",
  summary:
    "brushStart, brushChange, brushEnd and brushClear counted on a scatter chart whose box is dragged from code, with the last operateType and the number of points inside. A second button clears the box.",
  section: "Events",
  tags: ['brushStart','brushChange','brushEnd','brushClear','inBrushData'],
  docs: [
    "repo/docs/assets/api/en/API/event.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
