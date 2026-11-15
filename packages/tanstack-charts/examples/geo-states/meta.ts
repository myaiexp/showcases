// tanstack-charts example: Focus states and anchors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Focus states and anchors",
  summary:
    "states restyle the hovered country (amber fill, white outline) and dim the rest with a short tween. Each feature's focus point is its projected centroid; anchor sets the longitude and latitude reported as its semantic x and y.",
  section: "Geo Shape Mark",
  tags: ['tooltip format', 'geoShape', 'states', 'anchor', 'geoCentroid', 'tooltip'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/marks/geo.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
