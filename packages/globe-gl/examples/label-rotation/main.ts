// Labels: labelRotation turns each label clockwise in its latitude plane (degrees)
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
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Degrees clockwise, measured from the horizontal line of latitude.' });
  const dark = await texture('dark');
  const S = stage.preview ? 2.2 : 1.4;

  const places: Label[] = ['London', 'Madrid', 'Berlin', 'Istanbul', 'Moscow', 'Helsinki', 'Cairo', 'Riyadh', 'Tehran'].map((n) => {
    const c = city(n);
    return { lat: c.lat, lng: c.lng, text: c.name };
  });

  let angle = 0;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .labelsData(places)
    .labelSize(S)
    .labelDotRadius(S / 4)
    .labelsTransitionDuration(900)
    .labelRotation(() => angle);

  const turn = (deg: number): void => {
    angle = deg;
    globe.labelRotation(globe.labelRotation());
  };
  globe.pointOfView({ lat: 38, lng: 22, altitude: 1 });

  if (stage.bar) {
    slider(stage.bar, 'Rotation', 0, 360, 5, angle, turn, (v) => `${v}°`);
  } else {
    stage.every(1600, () => turn((angle + 60) % 360));
    stage.loop((_dt, t) => globe.pointOfView({ lat: 38, lng: 22 + 10 * Math.sin(t * 0.5), altitude: 1 }));
  }

  return stage.dispose;
};

export default mount;
