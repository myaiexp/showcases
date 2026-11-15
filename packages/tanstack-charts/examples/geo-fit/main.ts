// geoShape fit: 'data' zooms to the drawn shapes, 'sphere' keeps the whole world, or fit to a chosen geometry
import { defineChart, mountChart } from '@tanstack/charts';
import { geoShape } from '@tanstack/charts/geo';
import { geoMercator, type GeoPermissibleObjects } from 'd3-geo';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { countries } from '../../shared/marks2-world.ts';
import { createStage } from '../../shared/stage.ts';

const europeNames = new Set(['France', 'Germany', 'Spain', 'Italy', 'Poland', 'Norway', 'Sweden', 'Finland', 'United Kingdom', 'Ukraine', 'Romania', 'Greece']);
const europe = countries.filter((c) => europeNames.has(c.properties.name));
// A rectangle in lon/lat used to fit the map to southern Africa.
const southernAfrica: GeoPermissibleObjects = { type: 'Polygon', coordinates: [[[10, -36], [42, -36], [42, -4], [10, -4], [10, -36]]] };

type Fit = 'data' | 'sphere' | 'box';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (fit: Fit) =>
    defineChart({
      svgAnimation: true,
      marks: [
        geoShape(fit === 'data' ? europe : countries, {
          key: (f) => f.properties.name,
          projection: { type: geoMercator, fit: fit === 'box' ? southernAfrica : fit === 'sphere' ? 'sphere' : 'data', inset: 8 },
          fill: (f) => (europeNames.has(f.properties.name) ? '#fbbf24' : '#3b82f6'),
          fillOpacity: 0.5,
          stroke: '#e5e7eb',
          strokeWidth: 0.4,
        }),
      ],
      scales: { x: null, y: null },
      guides: false,
    });

  const options = (fit: Fit) => ({ definition: build(fit), height: stage.height, ariaLabel: 'Map fitted three ways' });
  const host = stage.own(mountChart(stage.box, options('data')));
  const modes = [['data', "fit: 'data' (twelve European countries)"], ['sphere', "fit: 'sphere' (stable world frame)"], ['box', 'fit: a Polygon over southern Africa']] as const;
  const show = (fit: Fit): void => host.update(options(fit));
  if (stage.bar) select(stage.bar, 'fit', modes, show);
  else stage.cycle(modes.map((m) => m[0]), 2000, show);
  return () => stage.dispose();
};

export default mount;
