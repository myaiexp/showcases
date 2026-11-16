// leafer-ui example: Motion: a chain following the path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Motion: a chain following the path",
  summary: "Several links are placed with getMotionPoint(position - i * gap) from one head position, so the chain bends along the path like the docs' dragon built from parts.",
  section: "Element animation",
  tags: ["getMotionPoint", "getMotionTotal", "Platform.requestRender"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/UI/getMotionPoint.md", "pages/www-leaferjs-com/ui/en/reference/UI/getMotionTotal.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
