// toGlobeCoords: which lat and lng sits under a pixel of the canvas, or null
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Mark {
  lat: number;
  lng: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the mouse: toGlobeCoords(x, y) of the pointer’s canvas pixel, with a marker on the spot.' });
  const atlas = await texture('atlas');
  const log = readout(stage.preview ? stage.container : stage.box, 'move over the canvas');
  if (stage.preview) log.style.cssText += ';position:absolute;left:6px;top:4px;z-index:2;font-size:10px;color:#223';

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(atlas)
    .backgroundColor('#e9eef3')
    .pointColor(() => '#d62828')
    .pointAltitude(0.04)
    .pointRadius(1.2)
    .pointsTransitionDuration(0);

  const probe = (x: number, y: number): void => {
    const hit: Mark | null = globe.toGlobeCoords(x, y);
    log.textContent = `toGlobeCoords(${Math.round(x)}, ${Math.round(y)}) → ${hit ? `lat ${hit.lat.toFixed(1)}, lng ${hit.lng.toFixed(1)}` : 'null'}`;
    globe.pointsData(hit ? [hit] : []);
  };

  if (stage.bar) {
    stage.container.addEventListener('pointermove', (e) => {
      const r = stage.container.getBoundingClientRect();
      probe(e.clientX - r.left, e.clientY - r.top);
    });
  } else {
    // The card sweeps a probe along a figure eight that leaves the globe at its ends.
    stage.loop((_dt, t) => probe(stage.width / 2 + Math.sin(t * 0.9) * stage.width * 0.45, stage.height / 2 + Math.sin(t * 1.8) * 40));
  }

  return stage.dispose;
};

export default mount;
