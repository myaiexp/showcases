// Paths: onPathHover lights the path under the pointer, onPathClick flies to it
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Route {
  name: string;
  points: [number, number][];
}

const trips = [
  ['Beijing', 'Delhi', 'Tehran', 'Istanbul', 'Paris'],
  ['Cape Town', 'Johannesburg', 'Nairobi', 'Cairo', 'Madrid'],
  ['Los Angeles', 'Mexico City', 'Bogotá', 'Lima', 'Santiago'],
  ['Tokyo', 'Manila', 'Jakarta', 'Perth', 'Sydney'],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a path to light it and see its name; click it to fly to its middle.' });
  const dark = await texture('dark');
  const log = stage.bar && readout(stage.bar, 'Hover or click a path');

  const routes: Route[] = trips.map((names) => ({
    name: `${names[0]} to ${names[names.length - 1]}`,
    points: names.map((n) => [city(n).lat, city(n).lng]),
  }));

  let hovered: Route | null = null;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .pathsData(routes)
    .pathPoints('points')
    .pathLabel((d) => `<b>${(d as Route).name}</b>`)
    .pathColor((d: object) => ((d as Route) === hovered ? '#ff5d73' : '#ffd166'))
    .pathStroke((d) => ((d as Route) === hovered ? 1 : 0.5))
    .onPathHover((path) => {
      hovered = path as Route | null;
      // Accessors are read again only when set, so set them again to repaint.
      globe.pathColor(globe.pathColor()).pathStroke(globe.pathStroke());
      if (log) log.textContent = hovered ? `Hovering ${hovered.name}` : 'Hover or click a path';
    })
    .onPathClick((path, _event, { lat, lng, altitude }) => {
      const r = path as Route;
      const mid = r.points[2]!;
      globe.pointOfView({ lat: mid[0], lng: mid[1], altitude: 1.8 }, 1000);
      if (log) log.textContent = `Clicked ${r.name} at ${lat.toFixed(1)}, ${lng.toFixed(1)}, altitude ${altitude.toFixed(3)}`;
    });
  globe.pointOfView({ lat: 10, lng: 40, altitude: 2.8 });

  if (stage.preview) {
    // No pointer in a card: a fake one rests on the middle city of each path in turn and clicks it.
    const ghost = stage.ghost(globe);
    let i = 0;
    stage.every(2400, () => {
      const r = routes[i++ % routes.length]!;
      const mid = r.points[2]!;
      globe.pointOfView({ lat: mid[0] - 8, lng: mid[1], altitude: 2.8 }, 600);
      stage.after(800, () => ghost.at(mid[0], mid[1], 0.001));
      stage.after(1500, () => ghost.click());
    });
  } else {
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.3;
  }

  return stage.dispose;
};

export default mount;
