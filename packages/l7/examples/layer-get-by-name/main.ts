// new PointLayer({ name }) and scene.getLayerByName(name): finding a layer again
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { PARSER, grid } from '../../shared/layer-demo.ts';
import { createStage } from '../../shared/stage.ts';

const NAMES = ['north', 'middle', 'south'] as const;
const COLORS = ['#ff6b6b', '#ffd166', '#4ecdc4'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.6 }),
  });
  await stage.ready(scene);

  // Three layers made in a loop: only their names say which is which.
  NAMES.forEach((name, i) => {
    scene.addLayer(
      new PointLayer({ name })
        .source(grid(ctx.preview ? 5 : 8, 1, [10, 50 - i * 4], 4, i + 1), PARSER)
        .shape('circle')
        .size(ctx.preview ? 14 : 20)
        .color(COLORS[i] ?? '#fff'),
    );
  });

  const out = stage.readout();
  if (stage.bar) {
    for (const name of NAMES) {
      button(stage.bar, `getLayerByName('${name}').hide()/show()`, () => {
        const layer = scene.getLayerByName(name);
        if (!layer) return;
        if (layer.isVisible()) layer.hide();
        else layer.show();
        if (out) out.textContent = `scene.getLayerByName('${name}').isVisible() = ${layer.isVisible()}`;
      });
    }
  } else {
    stage.every(800, (i) => {
      const layer = scene.getLayerByName(NAMES[i % 3] ?? 'north');
      if (!layer) return;
      if (layer.isVisible()) layer.hide();
      else layer.show();
    });
  }

  return () => stage.dispose();
};

export default mount;
