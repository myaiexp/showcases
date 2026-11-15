// enableBoxSelect: drag a rectangle, boxselect reports its bounds, points inside light up
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { scatter } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

type Bounds = [[number, number], [number, number]];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 48], zoom: ctx.preview ? 2.4 : 3.4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const points = scatter(ctx.preview ? 300 : 900, { spread: 4 }).map((p) => ({ ...p, inside: 0 }));
  const dots = new PointLayer()
    .source(points, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(3)
    .color('inside', ['#4b6a88', '#ffd166']);
  scene.addLayer(dots);
  const show = valuePanel(stage.container, 'br');

  // While box selection is on, map dragging is switched off and drags draw a box instead.
  scene.enableBoxSelect(false);
  scene.on('boxselectend', (bounds: Bounds) => {
    const [[x0, y0], [x1, y1]] = bounds;
    let n = 0;
    for (const p of points) {
      p.inside = p.lng >= Math.min(x0, x1) && p.lng <= Math.max(x0, x1) && p.lat >= Math.min(y0, y1) && p.lat <= Math.max(y0, y1) ? 1 : 0;
      n += p.inside;
    }
    dots.setData(points);
    show({ boxselectend: `${n} points`, bounds: bounds.map((c) => c.map((v) => v.toFixed(1)).join(',')).join(' → ') });
  });

  if (stage.bar) {
    button(stage.bar, 'enableBoxSelect()', () => scene.enableBoxSelect(false));
    button(stage.bar, 'disableBoxSelect()', () => scene.disableBoxSelect());
  }
  if (stage.preview) {
    const ghost = stage.ghost(scene);
    const boxes: [number, number, number, number][] = [[40, 40, 140, 130], [120, 60, 230, 170], [30, 90, 120, 180]];
    stage.every(2200, (i) => {
      const [ax, ay, bx, by] = boxes[i % boxes.length]!;
      const path: [number, number][] = [];
      for (let k = 0; k <= 10; k++) path.push([ax + ((bx - ax) * k) / 10, ay + ((by - ay) * k) / 10]);
      void ghost.drag(path, 60);
    });
  }

  return () => stage.dispose();
};

export default mount;
