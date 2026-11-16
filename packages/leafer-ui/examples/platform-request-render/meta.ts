// leafer-ui example: Platform.requestRender: an animation frame loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Platform.requestRender: an animation frame loop",
  summary: "Platform.requestRender(fn) is Leafer's cross-platform requestAnimationFrame; calling it again from fn makes a loop. A rect orbits using it and a counter reports the frames.",
  section: "Events",
  tags: ["Platform.requestRender", "RenderEvent"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/basic/Render.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
