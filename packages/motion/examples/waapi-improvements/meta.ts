// motion example: Native Web Animations versus Motion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Native Web Animations versus Motion",
  summary: "The same two UI moments with the browser's raw element.animate() and with Motion: native leaves the box snapping back when it finishes and jumps when interrupted, Motion keeps the end state and picks up smoothly.",
  section: "Guides",
  tags: ["animate","fill","interrupt","stop","finished","seconds"],
  docs: ["pages/motion-dev/docs/improvements-to-the-web-animations-api-dx.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
