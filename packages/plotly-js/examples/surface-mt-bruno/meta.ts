// plotly-js example: Topographical 3D surface
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Topographical 3D surface',
  summary:
    "A surface trace drawn from a 24×24 grid of elevations (the docs' Mt Bruno dataset); the card orbits the 3D camera.",
  section: '3D Surface Plots',
  tags: ['surface', 'scene.camera', 'relayout'],
  docs: ['repo/_posts/plotly_js/3d/3d-surface/2015-04-09-elevations-3d-surface.html', 'repo/api_docs/mt_bruno_elevation.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});
