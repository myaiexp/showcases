// HTML elements: htmlElement as an attribute name holding prebuilt elements
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Clock {
  lat: number;
  lng: number;
  /** Offset from UTC, hours (rough: from longitude). */
  zone: number;
  /** The element the layer will use as-is. */
  el: HTMLElement;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each city already owns its element; the layer only positions it, and the page keeps changing its text.' });
  const dark = await texture('dark');

  const clocks: Clock[] = cities.slice(0, stage.preview ? 12 : 20).map((c) => {
    const box = document.createElement('div');
    box.style.cssText = `font:${stage.preview ? 10 : 12}px/1.25 ui-monospace,monospace;color:#fff;background:rgba(10,20,40,.85);
      border:1px solid #6fd3a0;border-radius:6px;padding:2px 6px;text-align:center;white-space:nowrap`;
    return { lat: c.lat, lng: c.lng, zone: Math.round(c.lng / 15), el: box };
  });
  const names = new Map(clocks.map((c, i) => [c, cities[i]!.name]));

  // The attribute 'el' is read from each datum instead of a function being called.
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .htmlElementsData(clocks)
    .htmlElement('el');

  // The elements are ours, so changing them needs no call to the globe.
  const tick = (): void => {
    const now = Date.now();
    for (const c of clocks) {
      const t = new Date(now + c.zone * 3600_000);
      const hh = String(t.getUTCHours()).padStart(2, '0');
      const mm = String(t.getUTCMinutes()).padStart(2, '0');
      const ss = String(t.getUTCSeconds()).padStart(2, '0');
      c.el.textContent = `${names.get(c)} ${hh}:${mm}:${ss}`;
    }
  };
  tick();
  stage.every(1000, tick);

  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;
  globe.pointOfView({ lat: 20, lng: 20, altitude: 2.3 });

  return stage.dispose;
};

export default mount;
