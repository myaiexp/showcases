// Vizzu example: feature.coordSystem.toCanvas converts plot-relative points to canvas pixels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Coordinate system API',
  summary:
    "chart.feature.coordSystem converts between canvas pixels and the plot's own relative coordinates: toCanvas goes one way, toRelative the other. A marker's draw event gives its box in relative coordinates, so converting its centre with toCanvas puts a dot on each marker, and the corner label shows how close that lands to the centre the marker reports in pixels. The full view also converts the pointer position.",
  section: 'Code reference',
  tags: ['feature', 'coordSystem', 'toCanvas', 'toRelative', 'plot-marker-draw', 'draw-complete'],
  docs: [
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/plugins/coordsys.ts',
    'repo/src/apps/weblib/ts-api/module/ccoordsys.ts',
    'repo/src/apps/weblib/ts-api/events.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
