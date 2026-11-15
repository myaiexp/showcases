// HTML elements: htmlTransitionDuration animates elements to new positions
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Traveller {
  name: string;
  lat: number;
  lng: number;
  color: string;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The three travellers swap cities every few seconds; the duration decides how they glide.' });
  const dark = await texture('dark');

  const route = ['London', 'Tokyo', 'New York', 'Cairo', 'Sydney', 'Lima'].map(city);
  const travellers: Traveller[] = [
    { name: 'A', lat: 0, lng: 0, color: '#ffd166' },
    { name: 'B', lat: 0, lng: 0, color: '#5ec8ff' },
    { name: 'C', lat: 0, lng: 0, color: '#ef476f' },
  ];
  let stop = 0;
  const move = (): void => {
    travellers.forEach((t, i) => {
      const c = route[(stop + i * 2) % route.length]!;
      t.lat = c.lat;
      t.lng = c.lng;
    });
  };
  move();

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .htmlTransitionDuration(1800)
    .htmlAltitude(0.03)
    .htmlElement((d) => {
      const t = d as Traveller;
      const m = document.createElement('div');
      m.textContent = t.name;
      m.style.cssText = `width:${stage.preview ? 18 : 24}px;height:${stage.preview ? 18 : 24}px;border-radius:50%;background:${t.color};
        color:#111;font:bold ${stage.preview ? 11 : 14}px/${stage.preview ? 18 : 24}px system-ui,sans-serif;text-align:center`;
      return m;
    })
    .htmlElementsData(travellers);

  const step = (): void => {
    stop++;
    move();
    // Same objects, new coordinates: set the data again to start the glide.
    globe.htmlElementsData([...travellers]);
  };
  globe.pointOfView({ lat: 20, lng: 20, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.4;

  if (stage.bar) {
    slider(stage.bar, 'Transition', 0, 4000, 100, 1800, (v) => globe.htmlTransitionDuration(v), (v) => `${v} ms`);
  }
  stage.every(stage.preview ? 2800 : 3600, step);

  return stage.dispose;
};

export default mount;
