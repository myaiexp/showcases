// l7 example: Box selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Box selection",
  summary:
    "enableBoxSelect turns drags into a selection box (map dragging is off meanwhile); boxselectend reports the box as lng/lat bounds, and the points inside turn yellow.",
  section: 'Scene',
  tags: ["enableBoxSelect", "disableBoxSelect", "boxselectend"],
  docs: ["repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
