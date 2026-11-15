// leaflet example: Rectangle bounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rectangle bounds",
  summary:
    "A Rectangle built from two opposite corners, moved between regions with setBounds. getBounds reads the corners back.",
  section: "Vector layers",
  tags: ["Rectangle", "setBounds", "getBounds"],
  docs: ['repo/src/layer/vector/Rectangle.js', 'repo/src/layer/vector/Polygon.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
