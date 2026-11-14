// motion example: Animations while the page freezes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animations while the page freezes",
  summary: "Two boxes loop side by side: one animates transform (handed to the browser, off the main thread), one animates left (done by JavaScript on the main thread). Press the freeze button and the compositor-driven one keeps moving.",
  section: "Guides",
  tags: ["transform","left","hardware acceleration","WAAPI","performance"],
  docs: ["pages/motion-dev/docs/performance.md","pages/motion-dev/docs/improvements-to-the-web-animations-api-dx.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
