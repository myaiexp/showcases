// Labels: labelsTransitionDuration animates moves and scales new labels in
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Label {
  lat: number;
  lng: number;
  text: string;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every few seconds the labels jump to new places and some are swapped for others.' });
  const dark = await texture('dark');
  const S = stage.preview ? 3 : 1.8;

  // Two layouts for the same slots: each label moves between them, and the last few are replaced.
  const pick = (names: string[]): Label[] => names.map((n) => {
    const c = cities.find((x) => x.name === n)!;
    return { lat: c.lat, lng: c.lng, text: c.name };
  });
  const layouts: Label[][] = [
    pick(['London', 'Cairo', 'Moscow', 'Delhi', 'Tokyo', 'Lagos', 'Nairobi']),
    pick(['Madrid', 'Riyadh', 'Helsinki', 'Mumbai', 'Seoul', 'Cairo', 'Tehran']),
  ];
  // Same objects in both layouts for the first four slots, so those move; the rest are new.
  const slots = [0, 1, 2, 3].map((i) => ({ ...layouts[0]![i]! }));
  const dataFor = (n: number): Label[] => {
    const to = layouts[n % 2]!;
    slots.forEach((s, i) => Object.assign(s, to[i]));
    return [...slots, ...to.slice(4)];
  };

  let step = 0;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .labelsData(dataFor(0))
    .labelSize(S)
    .labelDotRadius(S / 4)
    .labelColor(() => '#ffffff')
    .labelAltitude(() => 0.01)
    .labelsTransitionDuration(1200);

  const advance = (): void => {
    globe.labelsData(dataFor(++step));
  };
  globe.pointOfView({ lat: 30, lng: 40, altitude: 1.9 });

  if (stage.bar) {
    slider(stage.bar, 'Transition', 0, 3000, 100, 1200, (v) => globe.labelsTransitionDuration(v), (v) => `${v} ms`);
    stage.every(3500, advance);
  } else {
    stage.every(2600, advance);
    stage.loop((_dt, t) => globe.pointOfView({ lat: 30, lng: 40 + 12 * Math.sin(t * 0.4), altitude: 1.9 }));
  }

  return stage.dispose;
};

export default mount;
