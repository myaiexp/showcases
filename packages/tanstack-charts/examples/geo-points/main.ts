// geoShape with Point features: r reads a value, rScale turns it into a pixel radius
import { defineChart, mountChart } from '@tanstack/charts';
import { geoShape } from '@tanstack/charts/geo';
import { tooltip } from '@tanstack/charts/tooltip';
import { geoNaturalEarth1 } from 'd3-geo';
import type { Mount } from '@/types.ts';
import { cities, countries } from '../../shared/marks2-world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Circle area follows the (rounded) city population in millions.' });
  // Both layers share one fit, taken from the sphere, so the points land on the countries.
  const projection = { type: geoNaturalEarth1, fit: 'sphere' as const, inset: 6 };

  const definition = defineChart({
    marks: [
      geoShape(countries, { projection, fill: '#1f2937', stroke: '#475569', strokeWidth: 0.4 }),
      geoShape(cities, {
        key: (c) => c.properties.name,
        projection,
        r: (c) => c.properties.size,
        rScale: (value: number) => 3 + 2.4 * Math.sqrt(value),
        fill: '#fbbf24',
        fillOpacity: 0.7,
        stroke: '#92400e',
      }),
    ],
    scales: { x: null, y: null },
    guides: false,
    tooltip: {
      use: tooltip,
      format: (point) => ('size' in point.datum.properties ? `${point.datum.properties.name}: ${point.datum.properties.size}M` : point.datum.properties.name),
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Cities as circles on a world map' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
