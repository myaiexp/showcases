// pixelToLngLat and lngLatToPixel: a grid of screen points mapped to coordinates
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [0, 20], zoom: ctx.preview ? 0.6 : 1.4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // Every 40 px across the container, pixelToLngLat says where on Earth that pixel is.
  const grid = (): { lng: number; lat: number }[] => {
    const [w, h] = scene.getSize();
    const out: { lng: number; lat: number }[] = [];
    for (let x = 20; x < w; x += 40) for (let y = 20; y < h; y += 40) out.push(scene.pixelToLngLat([x, y]));
    return out;
  };
  const dots = new PointLayer().source(grid(), { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('rhombus').size(4).color('#7fdbff');
  scene.addLayer(dots);

  // lngLatToPixel goes the other way: where does Null Island sit on screen?
  const show = valuePanel(stage.container, 'br');
  const report = (): void => {
    const p = scene.lngLatToPixel([0, 0]);
    show({ 'lngLatToPixel([0, 0])': `(${Math.round(p.x)}, ${Math.round(p.y)})` });
  };
  report();
  // After a move, the grid is recomputed so it stays on the same pixels while the land slides.
  scene.on('moveend', () => {
    dots.setData(grid());
    report();
  });

  if (stage.preview) stage.every(1500, (i) => scene.panTo([((i * 47) % 160) - 80, 10]));

  return () => stage.dispose();
};

export default mount;
