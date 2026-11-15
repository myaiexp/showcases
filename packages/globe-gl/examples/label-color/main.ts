// Labels: labelColor takes any CSS colour, rgba() alpha included, per label
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Label {
  lat: number;
  lng: number;
  text: string;
  pop: number;
}

type Scheme = 'by population' | 'by hemisphere';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each label gets its own colour; the faintest ones use an alpha channel.' });
  const dark = await texture('dark');
  const S = stage.preview ? 2.2 : 1.4;

  const places: Label[] = ['London', 'Madrid', 'Berlin', 'Istanbul', 'Moscow', 'Helsinki', 'Cairo', 'Riyadh', 'Tehran', 'Paris'].map((n) => {
    const c = city(n);
    return { lat: c.lat, lng: c.lng, text: c.name, pop: c.pop };
  });

  let scheme: Scheme = 'by population';
  const colorOf = (d: Label): string => {
    if (scheme === 'by hemisphere') return d.lng < 20 ? '#ff7b7b' : '#6fd3ff';
    // Population from pale and transparent to a solid warm yellow.
    return d.pop > 10 ? '#ffd166' : d.pop > 5 ? 'rgba(255, 209, 102, 0.6)' : 'rgba(255, 255, 255, 0.35)';
  };

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .labelsData(places)
    .labelSize(S)
    .labelDotRadius(S / 4)
    .labelColor((d) => colorOf(d as Label));

  const paint = (next: Scheme): void => {
    scheme = next;
    globe.labelColor(globe.labelColor());
  };
  globe.pointOfView({ lat: 38, lng: 22, altitude: 1 });

  if (stage.bar) {
    select(stage.bar, 'Colour', ['by population', 'by hemisphere'] as const, paint, scheme);
  } else {
    stage.every(1800, () => paint(scheme === 'by population' ? 'by hemisphere' : 'by population'));
    stage.loop((_dt, t) => globe.pointOfView({ lat: 38, lng: 22 + 10 * Math.sin(t * 0.5), altitude: 1 }));
  }

  return stage.dispose;
};

export default mount;
