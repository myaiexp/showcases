// Labels: labelDotRadius sizes the marker dot in angular degrees
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Label {
  lat: number;
  lng: number;
  text: string;
  pop: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The dot radius is in degrees; the text keeps its distance from the dot edge.' });
  const dark = await texture('dark');
  const S = stage.preview ? 2.2 : 1.4;

  const places: Label[] = ['London', 'Madrid', 'Berlin', 'Istanbul', 'Moscow', 'Helsinki', 'Cairo', 'Riyadh', 'Tehran'].map((n) => {
    const c = city(n);
    return { lat: c.lat, lng: c.lng, text: c.name, pop: c.pop };
  });

  let radius = 0.8;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .labelsData(places)
    .labelSize(S)
    .labelColor(() => '#ff9f6b')
    .labelDotRadius(() => radius);

  const resize = (r: number): void => {
    radius = r;
    globe.labelDotRadius(globe.labelDotRadius());
  };
  globe.pointOfView({ lat: 38, lng: 22, altitude: 1 });

  if (stage.bar) {
    slider(stage.bar, 'Dot radius', 0, 2, 0.05, radius, resize, (v) => `${v.toFixed(2)}°`);
  } else {
    stage.every(1500, () => resize(radius > 0.5 ? 0.1 : 1.1));
    stage.loop((_dt, t) => globe.pointOfView({ lat: 38, lng: 22 + 10 * Math.sin(t * 0.5), altitude: 1 }));
  }

  return stage.dispose;
};

export default mount;
