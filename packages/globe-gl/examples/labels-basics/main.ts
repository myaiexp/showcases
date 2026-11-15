// Labels: labelsData draws each place's text beside a dot, from lat, lng and text
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Label {
  lat: number;
  lng: number;
  text: string;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One label per object: a dot at lat, lng and the text below it. Drag to look around.' });
  const dark = await texture('dark');
  const S = stage.preview ? 2.2 : 1.4;

  // Labels read `lat`, `lng` and `text` by default.
  const places: Label[] = ['London', 'Madrid', 'Berlin', 'Istanbul', 'Moscow', 'Helsinki', 'Cairo', 'Riyadh', 'Tehran'].map((n) => {
    const c = city(n);
    return { lat: c.lat, lng: c.lng, text: c.name };
  });

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .labelsData(places)
    .labelSize(S)
    .labelDotRadius(S / 4);

  globe.pointOfView({ lat: 38, lng: 22, altitude: 1 });
  if (stage.preview) {
    stage.loop((_dt, t) => globe.pointOfView({ lat: 38, lng: 22 + 10 * Math.sin(t * 0.5), altitude: 1 }));
  }

  return stage.dispose;
};

export default mount;
