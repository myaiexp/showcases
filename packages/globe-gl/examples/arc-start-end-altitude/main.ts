// Arcs: arcStartAltitude and arcEndAltitude link ground stations to satellites
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Link {
  name: string;
  startLat: number;
  startLng: number;
  startAlt: number;
  endLat: number;
  endLng: number;
  endAlt: number;
}

// Each relay goes up from one city to a satellite, then down to another city.
const relays = [
  { from: 'London', sat: { lat: 25, lng: 10 }, to: 'Lagos' },
  { from: 'Tokyo', sat: { lat: 10, lng: 150 }, to: 'Sydney' },
  { from: 'New York', sat: { lat: 30, lng: -45 }, to: 'Madrid' },
  { from: 'Mumbai', sat: { lat: 25, lng: 80 }, to: 'Moscow' },
  { from: 'Lima', sat: { lat: -10, lng: -60 }, to: 'São Paulo' },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Arcs start and end above the ground: city to satellite, satellite to city.' });
  const dark = await texture('dark');

  const build = (satAlt: number): Link[] =>
    relays.flatMap(({ from, sat, to }) => {
      const a = city(from);
      const b = city(to);
      return [
        { name: `${from} up`, startLat: a.lat, startLng: a.lng, startAlt: 0, endLat: sat.lat, endLng: sat.lng, endAlt: satAlt },
        { name: `${to} down`, startLat: sat.lat, startLng: sat.lng, startAlt: satAlt, endLat: b.lat, endLng: b.lng, endAlt: 0 },
      ];
    });

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .arcsData(build(0.4))
    .arcStartAltitude((d) => (d as Link).startAlt)
    .arcEndAltitude((d) => (d as Link).endAlt)
    .arcColor((d: object) => ((d as Link).startAlt === 0 ? ['#5ec8ff', '#ffd166'] : ['#ffd166', '#ef476f']))
    .arcStroke(0.3)
    .arcAltitude(null)
    .arcAltitudeAutoScale(0.2)
    .arcsTransitionDuration(400);

  if (stage.bar) {
    slider(stage.bar, 'Satellite altitude', 0, 1, 0.05, 0.4, (v) => {
      globe.arcsData(build(v));
    }, (v) => v.toFixed(2));
  }

  globe.pointOfView({ lat: 20, lng: 40, altitude: 3 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  return stage.dispose;
};

export default mount;
