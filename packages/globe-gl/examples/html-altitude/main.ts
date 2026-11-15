// HTML elements: htmlAltitude floats each element above the surface, in radii
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each marker floats higher the bigger its city; the points underneath show where it is anchored.' });
  const dark = await texture('dark');
  const data = cities.slice(0, stage.preview ? 10 : 16);

  let scale = 0.008;
  const alt = (d: object): number => (d as City).pop * scale;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .htmlElementsData(data)
    .htmlTransitionDuration(800)
    .htmlAltitude(alt)
    .htmlElement((d) => {
      const m = document.createElement('div');
      m.textContent = (d as City).name;
      m.style.cssText = `font:${stage.preview ? 10 : 12}px/1 system-ui,sans-serif;color:#fff;background:rgba(160,60,90,.85);
        border-radius:4px;padding:2px 6px;white-space:nowrap`;
      return m;
    })
    // Columns to the same height, so the stem is visible.
    .pointsData(data)
    .pointAltitude(alt)
    .pointRadius(0.12)
    .pointColor(() => 'rgba(255,255,255,.7)')
    .pointsTransitionDuration(800);

  const set = (v: number): void => {
    scale = v;
    globe.htmlAltitude(alt).pointAltitude(alt);
  };
  globe.pointOfView({ lat: 25, lng: 20, altitude: 2.3 });

  if (stage.bar) {
    slider(stage.bar, 'Altitude per million people', 0, 0.015, 0.0005, scale, set, (v) => v.toFixed(4));
  } else {
    let high = true;
    stage.every(2400, () => {
      set(high ? 0.0035 : 0.01);
      high = !high;
    });
  }
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.6;

  return stage.dispose;
};

export default mount;
