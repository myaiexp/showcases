// geoShape: country polygons from bundled world-atlas data, fitted to the plot and colored by a value
import { colorGradientLegend, defineChart, mountChart } from '@tanstack/charts';
import { geoShape } from '@tanstack/charts/geo';
import { tooltip } from '@tanstack/charts/tooltip';
import { geoEqualEarth } from 'd3-geo';
import { scaleSequential } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { heat } from '../../shared/marks2-color.ts';
import { countries } from '../../shared/marks2-world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a country. The values are made up and only show the color scale.' });

  const definition = defineChart({
    marks: [
      geoShape(countries, {
        key: (f) => f.properties.name,
        // A descriptor makes D3 create the projection and fit the shapes to the final plot.
        projection: { type: geoEqualEarth, fit: 'data', inset: 4 },
        color: (f) => f.properties.value,
        stroke: '#0b0b0f',
        strokeWidth: 0.4,
      }),
    ],
    scales: { x: null, y: null },
    guides: false,
    color: {
      scale: scaleSequential(heat).domain([0, 100]),
      ...(stage.preview ? {} : { legend: colorGradientLegend({ label: 'Made-up value' }) }),
    },
    tooltip: {
      use: tooltip,
      format: (point) => `${point.datum.properties.name}: ${point.datum.properties.value}`,
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'World map colored by a made-up value' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
