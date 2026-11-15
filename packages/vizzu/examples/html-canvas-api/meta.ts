// Vizzu example: feature.htmlCanvas gives the canvas element and converts client to canvas coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'HTML canvas API',
  summary:
    'chart.feature.htmlCanvas exposes the canvas element Vizzu draws on and the conversions clientToCanvas and canvasToClient between page and canvas coordinates. The card prints the canvas size; in the full view a cross drawn at the converted pointer position follows the mouse.',
  section: 'Code reference',
  tags: ['feature', 'htmlCanvas', 'element', 'clientToCanvas', 'canvasToClient', 'draw-complete'],
  docs: [
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/plugins/htmlcanvas.ts',
    'repo/src/apps/weblib/ts-api/vizzu.ts',
    'repo/src/apps/weblib/ts-api/events.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
