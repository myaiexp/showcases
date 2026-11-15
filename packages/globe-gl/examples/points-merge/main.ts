// pointsMerge: thousands of columns merged into one Three.js object for speed
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { checkbox, readout } from '../../shared/controls.ts';
import { randomSpot, rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Spot {
  lat: number;
  lng: number;
  size: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Merged, the columns look the same but are one mesh: no per-point hover or click, and changes jump.' });
  const dark = await texture('dark');
  const rand = rng(21);
  const count = stage.preview ? 1500 : 6000;
  const data: Spot[] = Array.from({ length: count }, () => ({ ...randomSpot(rand), size: rand() }));

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .pointsMerge(true)
    .pointsData(data)
    .pointAltitude((d) => (d as Spot).size * 0.12)
    .pointRadius(0.25)
    .pointColor((d) => `hsl(${180 + (d as Spot).size * 140}, 90%, 60%)`);
  globe.controls().autoRotate = true;

  if (stage.bar) {
    const info = readout(stage.box);
    const report = (): void => {
      // renderer.info counts the draw calls of the last frame.
      stage.after(300, () => (info.textContent = `${count} points, ${globe.renderer().info.render.calls} draw calls per frame`));
    };
    checkbox(stage.bar, 'pointsMerge', true, (v) => (globe.pointsMerge(v), report()));
    report();
  }

  return stage.dispose;
};

export default mount;
