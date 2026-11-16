// aframe example: screenshot: getCanvas('perspective') into an <img>
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "screenshot: getCanvas('perspective') into an <img>",
  summary: "The screenshot component is on every scene. Calling components.screenshot.getCanvas('perspective') returns a canvas of width x height pixels showing the current view; the example turns it into an <img> in the read-out area so a captured frame sits beside the live view. Sliders pick the capture size.",
  section: 'Components',
  tags: ["screenshot", "getCanvas", "perspective", "capture", "width", "height", "canvas"],
  docs: ["repo/docs/components/screenshot.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
