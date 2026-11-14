// PlayCanvas: Text typewriter reveal
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text typewriter reveal",
  summary:
    "rangeStart and rangeEnd draw part of the text without laying it out again, so a line can be revealed a character at a time. Setting text resets the range, which gives the length to reveal; the full view sets the speed and skips ahead.",
  section: "User Interface",
  tags: ["rangeEnd","text","wrapLines","CanvasFont"],
  docs: ["repo/docs/user-manual/user-interface/text-elements.md","repo/docs/user-manual/user-interface/draw-order-and-performance.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
