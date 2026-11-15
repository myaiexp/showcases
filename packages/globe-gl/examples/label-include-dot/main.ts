// Labels: labelIncludeDot adds or drops the dot that marks the exact coordinate
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Label {
  lat: number;
  lng: number;
  text: string;
  dot: boolean;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'With a dot the text is offset from the coordinate; without one it is centred on it.' });
  const dark = await texture('dark');
  const S = stage.preview ? 2.2 : 1.4;

  const places: Label[] = ['London', 'Madrid', 'Berlin', 'Istanbul', 'Moscow', 'Helsinki', 'Cairo', 'Riyadh', 'Tehran'].map((n) => {
    const c = city(n);
    return { lat: c.lat, lng: c.lng, text: c.name, dot: true };
  });

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .labelsData(places)
    .labelSize(S)
    .labelDotRadius(S / 4)
    // An attribute name: each label's own `dot` flag decides.
    .labelIncludeDot('dot');

  const setDots = (on: boolean): void => {
    for (const p of places) p.dot = on;
    globe.labelIncludeDot('dot');
  };
  globe.pointOfView({ lat: 38, lng: 22, altitude: 1 });

  if (stage.bar) {
    checkbox(stage.bar, 'Include dot', true, setDots);
  } else {
    let on = true;
    stage.every(1800, () => setDots((on = !on)));
    stage.loop((_dt, t) => globe.pointOfView({ lat: 38, lng: 22 + 10 * Math.sin(t * 0.5), altitude: 1 }));
  }

  return stage.dispose;
};

export default mount;
