// Labels: labelLat, labelLng and labelText as attribute names and functions
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

// Data that does not use the default `lat`, `lng` and `text` keys.
interface Station {
  code: string;
  where: { latitude: number; longitude: number };
  pop: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The data uses its own keys; each accessor says where to read.' });
  const dark = await texture('dark');
  const S = stage.preview ? 2.2 : 1.4;

  const stations: Station[] = ['London', 'Madrid', 'Berlin', 'Istanbul', 'Moscow', 'Helsinki', 'Cairo', 'Riyadh', 'Tehran'].map((n) => {
    const c = city(n);
    return { code: c.name.slice(0, 3).toUpperCase(), where: { latitude: c.lat, longitude: c.lng }, pop: c.pop };
  });

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .labelsData(stations)
    // A function of the datum.
    .labelLat((d) => (d as Station).where.latitude)
    .labelLng((d) => (d as Station).where.longitude)
    // An attribute name.
    .labelText('code')
    .labelSize(S)
    .labelDotRadius(S / 4)
    .labelColor(() => '#ffd166');

  globe.pointOfView({ lat: 38, lng: 22, altitude: 1 });
  if (stage.preview) {
    stage.loop((_dt, t) => globe.pointOfView({ lat: 38, lng: 22 + 10 * Math.sin(t * 0.5), altitude: 1 }));
  }

  return stage.dispose;
};

export default mount;
