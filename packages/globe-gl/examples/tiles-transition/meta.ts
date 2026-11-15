// globe-gl example: Tiles: transition duration
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tiles: transition duration",
  summary:
    "Every few seconds each tile gets a new altitude and size through accessors, and tilesTransitionDuration animates the change. A slider sets the duration and a button forces a change.",
  section: "Tiles Layer",
  tags: ["tilesTransitionDuration", "tileAltitude", "tileWidth", "tileHeight"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
