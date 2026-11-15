// globe-gl example: Tiles: width and height
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tiles: width and height",
  summary:
    "tileWidth is a span of longitude and tileHeight a span of latitude in degrees. A slider sets both; a checkbox stretches the width by 1/cos(lat) so tiles stay squarish at high latitudes.",
  section: "Tiles Layer",
  tags: ["tileWidth", "tileHeight"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
