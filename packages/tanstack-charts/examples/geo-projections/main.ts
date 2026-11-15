// geoShape projection descriptors: the same shapes through different d3-geo projections
import { defineChart, mountChart } from '@tanstack/charts';
import { geoShape } from '@tanstack/charts/geo';
import { geoAzimuthalEqualArea, geoConicEqualArea, geoEqualEarth, geoMercator, geoNaturalEarth1, type GeoProjection } from 'd3-geo';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { countries } from '../../shared/marks2-world.ts';
import { createStage } from '../../shared/stage.ts';

const projections: readonly (readonly [() => GeoProjection, string])[] = [
  [geoEqualEarth, 'geoEqualEarth'],
  [geoNaturalEarth1, 'geoNaturalEarth1'],
  [geoMercator, 'geoMercator'],
  [geoConicEqualArea, 'geoConicEqualArea'],
  [() => geoAzimuthalEqualArea().rotate([0, -90]), 'geoAzimuthalEqualArea (polar)'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (type: () => GeoProjection) =>
    defineChart({
      marks: [geoShape(countries, { key: (f) => f.properties.name, projection: { type, fit: 'sphere', inset: 6 }, fill: '#3b82f6', fillOpacity: 0.55, stroke: '#e5e7eb', strokeWidth: 0.4 })],
      scales: { x: null, y: null },
      guides: false,
    });

  const options = (type: () => GeoProjection) => ({ definition: build(type), height: stage.height, ariaLabel: 'World map in a chosen projection' });
  const host = stage.own(mountChart(stage.box, options(geoEqualEarth)));
  const show = (p: readonly [() => GeoProjection, string]): void => {
    host.update(options(p[0]));
    stage.say(p[1]);
  };
  if (stage.bar) select(stage.bar, 'projection', projections.map((p) => [p, p[1]] as const), show);
  else stage.cycle(projections, 1900, show);
  return () => stage.dispose();
};

export default mount;
