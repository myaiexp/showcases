// geoShape layers: a sphere outline, a graticule of lines and land shapes, each with its own paint
import { defineChart, mountChart } from '@tanstack/charts';
import { geoShape } from '@tanstack/charts/geo';
import { geoGraticule10, geoOrthographic, type GeoPermissibleObjects } from 'd3-geo';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { countries } from '../../shared/marks2-world.ts';
import { createStage } from '../../shared/stage.ts';

const sphere: GeoPermissibleObjects = { type: 'Sphere' };
const graticule: GeoPermissibleObjects = geoGraticule10();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let lon = -20;

  // A callback projection receives the final bounds and returns the projection itself.
  const projection = ({ chart }: { chart: { width: number; height: number } }) =>
    geoOrthographic().rotate([lon, -20]).fitExtent([[8, 8], [chart.width - 8, chart.height - 8]], sphere);

  const build = () =>
    defineChart({
      marks: [
        geoShape([sphere], { id: 'sphere', projection, fill: '#0f172a', stroke: '#64748b', strokeWidth: 1 }),
        geoShape([graticule], { id: 'graticule', projection, stroke: '#64748b', strokeOpacity: 0.5, strokeWidth: 0.5, strokeDasharray: '2 3' }),
        geoShape(countries, { id: 'land', key: (f) => f.properties.name, projection, fill: '#38bdf8', fillOpacity: 0.55, stroke: '#e0f2fe', strokeWidth: 0.4 }),
      ],
      scales: { x: null, y: null },
      guides: false,
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Rotating globe' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => host.update(options());
  if (stage.bar) {
    slider(stage.bar, 'rotation', -180, 180, 5, lon, (x) => { lon = x; refresh(); }, (x) => `${x} deg`);
  } else {
    stage.every(120, () => { lon = (lon + 3) % 360; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
