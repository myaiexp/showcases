// Labels: labelSize is the text height in degrees, here scaled by population
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Label {
  lat: number;
  lng: number;
  text: string;
  pop: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Text height is in degrees of arc, so it grows with the globe, not the screen.' });
  const dark = await texture('dark');

  const places: Label[] = ['Tokyo', 'Delhi', 'Shanghai', 'Seoul', 'Bangkok', 'Manila', 'Jakarta', 'Singapore', 'Dhaka', 'Beijing']
    .map((n) => cities.find((c: City) => c.name === n)!)
    .map((c) => ({ lat: c.lat, lng: c.lng, text: c.name, pop: c.pop }));

  let scale = stage.preview ? 0.07 : 0.045;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .labelsData(places)
    .labelColor(() => '#ffffff')
    .labelSize((d) => 0.5 + (d as Label).pop * scale)
    .labelDotRadius(0.3);

  globe.pointOfView({ lat: 22, lng: 105, altitude: 1.2 });

  if (stage.bar) {
    slider(stage.bar, 'Degrees per million people', 0.01, 0.1, 0.005, scale, (v) => {
      scale = v;
      // The accessor reads `scale`, so set it again to apply the change.
      globe.labelSize(globe.labelSize());
    });
  } else {
    stage.loop((_dt, t) => globe.pointOfView({ lat: 22, lng: 105 + 14 * Math.sin(t * 0.5), altitude: 1.2 }));
  }

  return stage.dispose;
};

export default mount;
