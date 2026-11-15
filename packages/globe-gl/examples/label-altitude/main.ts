// Labels: labelAltitude lifts each label off the surface, in globe radii
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
  const stage = createStage(el, ctx, { hint: 'Tilt the view to the horizon: the bigger the city, the higher its label floats.' });
  const dark = await texture('dark');
  const S = stage.preview ? 2.2 : 1.4;

  const places: Label[] = ['London', 'Madrid', 'Berlin', 'Istanbul', 'Moscow', 'Helsinki', 'Cairo', 'Riyadh', 'Tehran'].map((n) => {
    const c = city(n);
    return { lat: c.lat, lng: c.lng, text: c.name, pop: c.pop };
  });

  let lift = 0.01;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .labelsData(places)
    .labelSize(S)
    .labelDotRadius(S / 4)
    .labelsTransitionDuration(600)
    .labelAltitude((d) => 0.002 + (d as Label).pop * lift);

  globe.pointOfView({ lat: 20, lng: 22, altitude: 1.1 });

  if (stage.bar) {
    slider(stage.bar, 'Altitude per million people', 0, 0.02, 0.001, lift, (v) => {
      lift = v;
      globe.labelAltitude(globe.labelAltitude());
    });
  } else {
    // Labels glide between flat and floating.
    let up = true;
    stage.every(2200, () => {
      lift = up ? 0.012 : 0;
      up = !up;
      globe.labelAltitude(globe.labelAltitude());
    });
    stage.loop((_dt, t) => globe.pointOfView({ lat: 20, lng: 22 + 10 * Math.sin(t * 0.5), altitude: 1.1 }));
  }

  return stage.dispose;
};

export default mount;
