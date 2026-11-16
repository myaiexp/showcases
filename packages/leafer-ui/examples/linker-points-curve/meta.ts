// leafer-ui example: Linker: curve { type, value } smooths the points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Linker: curve { type, value } smooths the points",
  summary:
    "curve: { type: 'C', value } sets how the waypoints are smoothed with cubic Bézier curves: 0 is sharp corners, 1 is fully round. The slider sweeps it.",
  section: "Official plugins",
  tags: ["Linker", "@leafer-in/linker", "points", "curve"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/linker.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
