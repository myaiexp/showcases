// leafer-ui example: Config wheel: zoomMode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config wheel: zoomMode",
  summary:
    "wheel.zoomMode: true makes the plain mouse wheel zoom (a trackpad scroll is still told apart); \"mouse\" zooms for sure when you know it is a mouse; false keeps wheel for panning and ctrl + wheel for zoom. The card turns a plain wheel while the mode cycles.",
  section: "App & engine config",
  tags: ['Leafer', 'wheel', 'zoomMode', 'viewport', 'config'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/wheel.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
