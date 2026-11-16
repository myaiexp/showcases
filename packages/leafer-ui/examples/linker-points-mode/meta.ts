// leafer-ui example: Linker: intermediate points as a number array
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Linker: intermediate points as a number array",
  summary:
    "points: [x1, y1, x2, y2, ...] adds waypoints between start and end; the connector is smoothed through them (curve defaults to type C, value 0.5).",
  section: "Official plugins",
  tags: ["Linker", "@leafer-in/linker", "points"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/linker.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
