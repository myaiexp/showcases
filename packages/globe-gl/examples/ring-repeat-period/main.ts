// Rings: ringRepeatPeriod spaces the rings, 0 or less emits a single ring
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cities, rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Ring {
  lat: number;
  lng: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['ringRepeatPeriod: 500 (repeats)', 'ringRepeatPeriod: 0 (one ring each)'],
    hint: 'Left: a ring leaves every 500 ms. Right: each ping emits a single ring and the next one starts elsewhere.',
  });
  const dark = await texture('dark');

  const [left, right] = stage.panes;
  const steady = stage.own(new Globe(left!.container), left)
    .globeImageUrl(dark)
    .ringsData(cities.filter((c) => ['London', 'Delhi', 'Lagos', 'Tokyo', 'Mexico City'].includes(c.name)))
    .ringMaxRadius(10)
    .ringPropagationSpeed(5)
    .ringRepeatPeriod(500)
    .ringColor(() => '#ffd166');

  const single = stage.own(new Globe(right!.container), right)
    .globeImageUrl(dark)
    .ringsData([])
    .ringMaxRadius(10)
    .ringPropagationSpeed(5)
    // 0 or less: no repetition, each ring object emits one ring.
    .ringRepeatPeriod(0)
    .ringColor(() => '#5ec8ff');

  // The right-hand globe pings a random city twice a second: a new object, so a new ring.
  const rand = rng(77);
  let rings: Ring[] = [];
  stage.every(600, () => {
    const c = cities[Math.floor(rand() * cities.length)]!;
    rings = [...rings.slice(-6), { lat: c.lat, lng: c.lng }];
    single.ringsData(rings);
  });

  if (stage.bar) {
    slider(stage.bar, 'Left period (ms)', 100, 2000, 100, 500, (v) => steady.ringRepeatPeriod(v));
  }

  for (const g of [steady, single]) {
    g.pointOfView({ lat: 25, lng: 30, altitude: stage.preview ? 2.8 : 2.5 });
    g.controls().autoRotate = true;
    g.controls().autoRotateSpeed = 0.5;
  }

  return stage.dispose;
};

export default mount;
