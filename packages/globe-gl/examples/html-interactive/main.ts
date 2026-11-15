// HTML elements: own click handlers, which need pointer-events switched on
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a marker to light it up. The layer sits over the canvas with pointer-events off, so each button turns them back on.' });
  const dark = await texture('dark');
  const log = stage.bar && readout(stage.bar, 'Click a marker');
  const data = cities.slice(0, stage.preview ? 10 : 16);

  const buttons: HTMLButtonElement[] = [];
  const lit = new Set<City>();
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .htmlElementsData(data)
    .htmlElement((d) => {
      const city = d as City;
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = city.name;
      b.style.cssText = `font:${stage.preview ? 10 : 12}px/1 system-ui,sans-serif;color:#fff;background:rgba(20,30,60,.85);
        border:1px solid #5ec8ff;border-radius:8px;padding:3px 7px;white-space:nowrap;cursor:pointer;
        pointer-events:${stage.preview ? 'none' : 'auto'}`;
      b.addEventListener('click', () => {
        if (!lit.delete(city)) lit.add(city);
        b.style.background = lit.has(city) ? '#ef476f' : 'rgba(20,30,60,.85)';
        if (log) log.textContent = `${city.name} is ${lit.has(city) ? 'on' : 'off'} (${lit.size} on)`;
      });
      buttons.push(b);
      return b;
    });

  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.6;
  globe.pointOfView({ lat: 25, lng: 20, altitude: 2.3 });

  // Cards have no pointer: a timer clicks the buttons in turn.
  if (stage.preview) {
    let i = 0;
    stage.every(700, () => buttons[i++ % buttons.length]?.click());
  }

  return stage.dispose;
};

export default mount;
