// leafer-ui example: ResizeEvent: the canvas changed size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ResizeEvent: the canvas changed size",
  summary: "A fixed-size Leafer reports ResizeEvent.RESIZE when leafer.resize() changes its width, height or pixel ratio, with the new size and bigger/smaller flags. The slider resizes the canvas; the card cycles through sizes.",
  section: "Events",
  tags: ["ResizeEvent.RESIZE", "leafer.resize", "bigger", "smaller", "pixelRatio"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/basic/Resize.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
