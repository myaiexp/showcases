// leafer-ui example: Editor: transform methods act on a multiple selection as one
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor: transform methods act on a multiple selection as one",
  summary: "With two rects selected, rotateOf(), scaleOf() and move() transform them together around the selection's shared center.",
  section: 'Graphic editor',
  tags: ["Editor","rotateOf","scaleOf","move","multiple"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/Editor/transform.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
