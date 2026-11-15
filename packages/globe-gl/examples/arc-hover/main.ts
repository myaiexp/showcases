// Arcs: onArcHover and arcLabel show a tooltip and repaint the hovered arc
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
  ['New York', 'London'],
  ['London', 'Cairo'],
  ['Tokyo', 'Sydney'],
  ['São Paulo', 'Lagos'],
  ['Los Angeles', 'Tokyo'],
  ['Delhi', 'Moscow'],
  ['Cape Town', 'Rio de Janeiro'],
  ['Paris', 'Singapore'],
] as const;

/** The point half way along the great circle between two places, for the card's fake pointer. */
function midpoint(l: Link): { lat: number; lng: number } {
  const rad = Math.PI / 180;
  const vec = (lat: number, lng: number): number[] => [
    Math.cos(lat * rad) * Math.cos(lng * rad),
    Math.cos(lat * rad) * Math.sin(lng * rad),
    Math.sin(lat * rad),
  ];
  const a = vec(l.startLat, l.startLng);
  const b = vec(l.endLat, l.endLng);
  const m = a.map((x, i) => x + b[i]!);
  return { lat: Math.atan2(m[2]!, Math.hypot(m[0]!, m[1]!)) / rad, lng: Math.atan2(m[1]!, m[0]!) / rad };
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover an arc: its tooltip shows (arcLabel) and it turns thick and red.' });
  const dark = await texture('dark');
  const log = stage.bar && readout(stage.bar, 'Hover an arc');

  const links: Link[] = routes.map(([from, to]) => {
    const a = city(from);
    const b = city(to);
    return { name: `${from} to ${to}`, startLat: a.lat, startLng: a.lng, endLat: b.lat, endLng: b.lng };
  });

  let hovered: Link | null = null;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .arcsData(links)
    // A fixed peak, so the middle of every arc sits at a known height.
    .arcAltitude(0.25)
    .arcLabel((d) => `<b>${(d as Link).name}</b>`)
    .arcColor((d: object) => ((d as Link) === hovered ? '#ff5d73' : '#ffd166'))
    .arcStroke((d) => ((d as Link) === hovered ? 0.8 : 0.3))
    .arcsTransitionDuration(0)
    .onArcHover((arc) => {
      hovered = arc as Link | null;
      // Accessors are read again only when set, so set them again to repaint.
      globe.arcColor(globe.arcColor()).arcStroke(globe.arcStroke());
      if (log) log.textContent = hovered ? `Hovering ${hovered.name}` : 'Hover an arc';
    });

  globe.pointOfView({ lat: 25, lng: 20, altitude: 2.8 });

  if (stage.preview) {
    // No pointer in a card: a fake one visits the top of a different arc every two seconds.
    const ghost = stage.ghost(globe);
    const tour = [links[1]!, links[2]!, links[3]!, links[5]!];
    let i = 0;
    stage.every(2200, () => {
      const l = tour[i++ % tour.length]!;
      const m = midpoint(l);
      globe.pointOfView({ lat: m.lat - 15, lng: m.lng, altitude: 2.6 }, 600);
      stage.after(800, () => ghost.arc({ ...l, altitude: 0.25 }));
      stage.after(1900, () => ghost.leave());
    });
  } else {
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.3;
  }

  return stage.dispose;
};

export default mount;
