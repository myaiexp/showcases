// Arcs: onArcClick selects an arc, onArcRightClick reverses its direction
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Link {
  name: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

const routes = [
  ['London', 'Cairo'],
  ['Tokyo', 'Sydney'],
  ['São Paulo', 'Lagos'],
  ['Delhi', 'Moscow'],
] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left-click an arc to select it, right-click to reverse it. Dashes show the direction.' });
  const dark = await texture('dark');
  const log = stage.bar && readout(stage.bar, 'Click or right-click an arc');

  let links: Link[] = routes.map(([from, to]) => {
    const a = city(from);
    const b = city(to);
    return { name: `${from} to ${to}`, startLat: a.lat, startLng: a.lng, endLat: b.lat, endLng: b.lng };
  });
  let selected: string | null = null;

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .arcsData(links)
    .arcAltitude(0.25)
    .arcColor((d: object) => ((d as Link).name === selected ? '#ff5d73' : '#5ec8ff'))
    .arcStroke(0.6)
    .arcDashLength(0.25)
    .arcDashGap(0.15)
    .arcDashAnimateTime(2000)
    .arcsTransitionDuration(600)
    .onArcClick((arc, _event, { lat, lng, altitude }) => {
      selected = (arc as Link).name;
      globe.arcColor(globe.arcColor());
      if (log) log.textContent = `Clicked ${selected} at ${lat.toFixed(1)}, ${lng.toFixed(1)}, altitude ${altitude.toFixed(2)}`;
    })
    .onArcRightClick((arc) => {
      const flip = (arc as Link).name;
      // Swap the two ends of that arc, and give the layer the new list.
      links = links.map((l) =>
        l.name !== flip ? l : { ...l, startLat: l.endLat, startLng: l.endLng, endLat: l.startLat, endLng: l.startLng },
      );
      globe.arcsData(links);
      if (log) log.textContent = `Reversed ${flip}`;
    });

  globe.pointOfView({ lat: 20, lng: 40, altitude: 2.6 });

  if (stage.preview) {
    const ghost = stage.ghost(globe);
    let i = 0;
    stage.every(2200, () => {
      const l = links[i % links.length]!;
      const right = i++ % 2 === 1;
      // Face the arc, then put the fake pointer on its middle.
      globe.pointOfView({ lat: (l.startLat + l.endLat) / 2 - 10, lng: (l.startLng + l.endLng) / 2, altitude: 2.6 }, 500);
      stage.after(650, () => ghost.arc({ ...l, altitude: 0.25 }));
      stage.after(900, () => ghost.click(right ? 2 : 0));
      stage.after(1700, () => ghost.leave());
    });
  } else {
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.3;
  }

  return stage.dispose;
};

export default mount;
