// ImageLayer setData: a new picture swapped into the same layer on a timer, like a radar frame
import { type ILayer, ImageLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { drawImage } from '../../shared/images.ts';
import { CENTER, EXTENT } from '../../shared/raster-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

/** One "radar frame": rain cells drifting east as `i` grows. */
function frame(i: number): string {
  return drawImage(128, (g, s) => {
    g.fillStyle = '#10243a';
    g.fillRect(0, 0, s, s);
    for (let k = 0; k < 6; k++) {
      const x = ((k * 53 + i * 7) % (s + 40)) - 20;
      const y = (k * 37) % s;
      const grad = g.createRadialGradient(x, y, 2, x, y, 26);
      grad.addColorStop(0, 'rgba(255,90,60,.95)');
      grad.addColorStop(0.5, 'rgba(255,210,80,.6)');
      grad.addColorStop(1, 'rgba(80,200,255,0)');
      g.fillStyle = grad;
      g.fillRect(x - 30, y - 30, 60, 60);
    }
  });
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: CENTER, zoom: ctx.preview ? 3.6 : 4.4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const parser = { type: 'image', extent: EXTENT } as const;
  const make = (i: number): ILayer => new ImageLayer({}).source(frame(i), { parser }).style({ opacity: 0.85 });
  let current = make(0);
  scene.addLayer(current);

  // setData on a live ImageLayer swaps the picture in place, but it races the texture upload
  // (the model reads its texture before it exists), so each frame is a new layer and the old
  // one goes once the new one has initialised.
  const out = stage.readout();
  stage.every(700, (i) => {
    const old = current;
    current = make(i);
    current.on('inited', () => scene.removeLayer(old));
    scene.addLayer(current);
    if (out) out.textContent = `frame ${i}: a new ImageLayer.source(picture, { parser })`;
  });
  return () => stage.dispose();
};

export default mount;
