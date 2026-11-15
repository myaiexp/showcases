// HTML elements: htmlElement returns a DOM element per datum, kept at its lat, lng
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each marker is a plain <div>; the layer moves it with the globe and hides it behind the horizon.' });
  const dark = await texture('dark');
  const shown = stage.preview ? 14 : 24;

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .htmlElementsData(cities.slice(0, shown))
    // Called once per datum; htmlLat and htmlLng default to `lat` and `lng`.
    .htmlElement((d) => {
      const marker = document.createElement('div');
      marker.textContent = (d as City).name;
      marker.style.cssText = `font:${stage.preview ? 10 : 12}px/1 system-ui,sans-serif;color:#fff;background:rgba(20,30,60,.8);
        border:1px solid #5ec8ff;border-radius:10px;padding:2px 7px;white-space:nowrap`;
      return marker;
    });

  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;
  globe.pointOfView({ lat: 20, lng: 20, altitude: 2.3 });

  return stage.dispose;
};

export default mount;
