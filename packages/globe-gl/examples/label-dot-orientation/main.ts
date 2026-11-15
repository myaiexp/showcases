// Labels: labelDotOrientation puts the text right of, above or below its dot
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
}

type Side = 'right' | 'top' | 'bottom';
const SIDES = ['right', 'top', 'bottom'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The default is bottom. Right keeps the text left-aligned against the dot.' });
  const dark = await texture('dark');
  const S = stage.preview ? 2.2 : 1.4;

  const places: Label[] = ['London', 'Madrid', 'Berlin', 'Istanbul', 'Moscow', 'Helsinki', 'Cairo', 'Riyadh', 'Tehran'].map((n) => {
    const c = city(n);
    return { lat: c.lat, lng: c.lng, text: c.name };
  });

  let side: Side = 'right';
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .labelsData(places)
    .labelSize(S)
    .labelDotRadius(S / 4)
    .labelColor(() => '#9be37c')
    .labelDotOrientation(() => side);

  const face = (next: Side): void => {
    side = next;
    globe.labelDotOrientation(globe.labelDotOrientation());
  };
  globe.pointOfView({ lat: 38, lng: 22, altitude: 1 });

  if (stage.bar) {
    select(stage.bar, 'Dot orientation', SIDES, face, side);
  } else {
    let i = 0;
    stage.every(1600, () => face(SIDES[++i % SIDES.length]!));
    stage.loop((_dt, t) => globe.pointOfView({ lat: 38, lng: 22 + 10 * Math.sin(t * 0.5), altitude: 1 }));
  }

  return stage.dispose;
};

export default mount;
