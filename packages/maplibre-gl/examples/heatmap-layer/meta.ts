// maplibre-gl example: Heatmap layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Heatmap layer',
  summary:
    'A heatmap of seeded points clustered around the sample cities. heatmap-weight reads a property, heatmap-color ramps over heatmap-density, and heatmap-radius grows with zoom; sliders adjust intensity, opacity and radius.',
  section: 'Layers',
  tags: ['heatmap', 'heatmap-density', 'interpolate', 'zoom'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
