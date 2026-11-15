// getProjectedBounds(zoom): the size of the world in pixels for EPSG3857, EPSG3395 and EPSG4326, with one point
import { EPSG3395, EPSG3857, EPSG4326, LatLng } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { BLUE, createPlane, GREEN, ORANGE, YELLOW } from '../../shared/plane.ts';

const CRSS = [
  { name: 'EPSG3857', crs: EPSG3857, color: BLUE },
  { name: 'EPSG3395', crs: EPSG3395, color: GREEN },
  { name: 'EPSG4326', crs: EPSG4326, color: ORANGE },
] as const;
const HELSINKI = new LatLng(60.17, 24.94);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The drawing is rescaled to fit at every zoom; the numbers are real pixels. The dot is Helsinki through each CRS\'s latLngToPoint. EPSG4326 is twice as wide as high; the Mercator CRSs are not.' });
  const plane = createPlane(stage, [0, 0, 1, 1]);
  const panel = stage.side('getProjectedBounds(zoom)');

  const draw = (zoom: number): void => {
    plane.clear();
    const side = 256 * 2 ** zoom;
    const view: [number, number, number, number] = [-side * 0.04, -side * 0.04, side * 2.1, side * 1.1];
    plane.svg.setAttribute('viewBox', view.join(' '));
    const size = side * 0.045;
    const lines: string[] = [];
    CRSS.forEach(({ name, crs, color }, i) => {
      const b = crs.getProjectedBounds(zoom);
      if (!b) return;
      // Every CRS's bounds start near the same origin, so they are drawn on top of each other.
      plane.live.rect({ x: b.min.x, y: b.min.y }, { x: b.max.x, y: b.max.y }, { stroke: color, fill: color, opacity: 0.1, width: 2 });
      const p = crs.latLngToPoint(HELSINKI, zoom);
      plane.live.dot(p, { fill: color, r: size * 0.35 });
      const s = b.getSize();
      lines.push(`${name}: ${s.x.toFixed(0)} × ${s.y.toFixed(0)} px, Helsinki at (${p.x.toFixed(0)}, ${p.y.toFixed(0)})`);
      plane.live.text({ x: b.max.x - size * 0.4, y: b.max.y - size * 0.4 - i * size * 1.2 }, name, { fill: color, size, anchor: 'end' });
    });
    plane.live.dot({ x: 0, y: 0 }, { fill: YELLOW, r: size * 0.25 });
    if (panel) panel.textContent = `zoom ${zoom}\n${lines.join('\n')}`;
    stage.say(`zoom ${zoom}: ${lines[0]}`);
  };
  draw(0);
  stage.slider('zoom', 0, 5, 1, 0, draw);

  if (stage.preview) {
    let z = 0;
    stage.every(1600, () => draw((z = (z + 1) % 5)));
  }
  return () => stage.dispose();
};

export default mount;
