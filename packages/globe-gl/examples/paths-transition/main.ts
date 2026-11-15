// Paths: changed pathsData animates, pathTransitionDuration sets how long
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { cities, rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'New paths draw themselves from start to end; every few seconds a new set arrives.' });
  const dark = await texture('dark');

  // Set n always has the same paths: four walks of five cities each.
  const makeSet = (n: number) => {
    const rand = rng(300 + n);
    return Array.from({ length: 4 }, () =>
      Array.from({ length: 5 }, () => {
        const c = cities[Math.floor(rand() * cities.length)]!;
        return [c.lat, c.lng];
      }),
    );
  };

  let n = 0;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .pathsData(makeSet(n))
    .pathColor(() => ['#ffd166', '#ef476f'])
    .pathStroke(0.4)
    .pathTransitionDuration(1500);

  const next = (): void => {
    globe.pathsData(makeSet(++n));
  };
  stage.every(stage.preview ? 3000 : 4000, next);

  if (stage.bar) {
    slider(stage.bar, 'pathTransitionDuration (ms)', 0, 4000, 100, 1500, (v) => globe.pathTransitionDuration(v));
    button(stage.bar, 'New paths now', next);
  }

  globe.pointOfView({ lat: 20, lng: 20, altitude: 2.6 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.4;

  return stage.dispose;
};

export default mount;
