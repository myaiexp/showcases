// globe-gl example: Render: showPointerCursor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render: showPointerCursor",
  summary:
    "Only objects with a click handler are clickable, and showPointerCursor decides whether the cursor turns into a hand over them: true, false, or a function of the hovered object's type and data. Here the function allows it only over cities above 15 million (orange).",
  section: "Render Control",
  tags: ["showPointerCursor", "onPointClick"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
