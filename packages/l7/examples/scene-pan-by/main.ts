// panBy moves the map by pixels: positive x pans right, positive y pans down
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { cityFeatures } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const MOVES: [number, number][] = [
  [80, 0],
  [0, 60],
  [-80, 0],
  [0, -60],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 30], zoom: 2 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(new PointLayer().source(cityFeatures()).shape('square').size(6).color('#7fdbff'));
  const show = valuePanel(stage.container, 'br');
  const pan = ([x, y]: [number, number]): void => {
    scene.panBy(x, y);
    show({ panBy: `(${x}, ${y})` });
  };

  if (stage.bar) {
    button(stage.bar, '← panBy(-100, 0)', () => pan([-100, 0]));
    button(stage.bar, 'panBy(100, 0) →', () => pan([100, 0]));
    button(stage.bar, '↑ panBy(0, -100)', () => pan([0, -100]));
    button(stage.bar, 'panBy(0, 100) ↓', () => pan([0, 100]));
  }
  // Cards: a square walk that ends where it started.
  if (stage.preview) stage.every(1000, (i) => pan(MOVES[i % MOVES.length]!));

  return () => stage.dispose();
};

export default mount;
