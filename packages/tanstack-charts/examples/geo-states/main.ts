// geoShape states: focus-driven fill, stroke and opacity, with a custom tooltip anchor
import { defineChart, mountChart } from '@tanstack/charts';
import { geoShape } from '@tanstack/charts/geo';
import { tooltip } from '@tanstack/charts/tooltip';
import { geoEqualEarth, geoCentroid } from 'd3-geo';
import type { Mount } from '@/types.ts';
import { countries } from '../../shared/marks2-world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a country: it is outlined and the others dim.' });

  const definition = defineChart({
    marks: [
      geoShape(countries, {
        key: (f) => f.properties.name,
        projection: { type: geoEqualEarth, fit: 'data', inset: 4 },
        fill: '#3b82f6',
        fillOpacity: 0.55,
        stroke: '#0b0b0f',
        strokeWidth: 0.4,
        // The default anchor is geoCentroid(); stating it shows where the semantic x/y values come from.
        anchor: (f) => geoCentroid(f),
        states: [
          { when: { focus: 'unmatched' }, style: { opacity: 0.5 }, transition: { type: 'tween', duration: 150 } },
          { when: { focus: 'primary' }, style: { fill: '#fbbf24', fillOpacity: 0.9, stroke: '#fff', strokeWidth: 1.2 }, transition: { type: 'tween', duration: 150 } },
        ],
      }),
    ],
    scales: { x: null, y: null },
    guides: false,
    tooltip: {
      use: tooltip,
      format: (point) => `${point.datum.properties.name}: ${point.datum.properties.value}`,
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'World map with hover states' }));
  if (stage.preview) stage.ghost((t) => [0.15 + 0.7 * t, 0.3 + 0.35 * Math.abs(Math.sin(t * 7))]);
  return () => stage.dispose();
};

export default mount;
