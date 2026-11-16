// leafer-ui example: Config: pointSnap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config: pointSnap",
  summary:
    "pointSnap rounds logical coordinates while dragging so elements land on whole numbers even when the view is zoomed to a fractional scale. The readout shows the dragged rect's x and y.",
  section: "App & engine config",
  tags: ['Leafer', 'pointSnap', 'config', 'draggable', 'type', 'viewport'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/base.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
