// smoothFactor simplifies a line per zoom level: fewer points drawn at higher values
import { LeafletMap, Polyline } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const wiggly = (): [number, number][] => {
  const pts: [number, number][] = [];
  for (let i = 0; i <= 300; i++) {
    const x = i / 300;
    pts.push([50 + 3 * Math.sin(x * 9) + 0.6 * Math.sin(x * 71) + 0.3 * Math.sin(x * 160), -2 + x * 24]);
  }
  return pts;
};

// The number of points the SVG path really draws: one M or L command each.
const drawn = (line: Polyline): number => (line.getElement()?.getAttribute('d')?.match(/[ML]/g) ?? []).length;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The line has 301 points. smoothFactor is the Douglas-Peucker tolerance in pixels; the default is 0.5.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const line = new Polyline(wiggly(), { color: '#f472b6', weight: 2, smoothFactor: 0.5 }).addTo(map);

  const apply = (factor: number): void => {
    line.setStyle({ smoothFactor: factor });
    // smoothFactor is read when the line is projected and clipped, so redraw() applies the new value.
    line.redraw();
    stage.say(`smoothFactor ${factor}: ${drawn(line)} of 301 points drawn`);
  };
  stage.slider('smoothFactor', 0, 30, 0.5, 0.5, apply);

  const steps = [0, 2, 8, 20];
  let i = 0;
  apply(steps[0]!);
  if (stage.preview) {
    stage.every(2000, () => apply(steps[++i % steps.length]!));
  }
  return () => stage.dispose();
};

export default mount;
