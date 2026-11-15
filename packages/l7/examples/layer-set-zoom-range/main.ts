// layer.setMinZoom(z) and layer.setMaxZoom(z): the zoom window a layer draws in
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { PARSER, grid } from '../../shared/layer-demo.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 4 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer({ minZoom: 3, maxZoom: 5 })
    .source(grid(ctx.preview ? 4 : 6, 3), PARSER)
    .shape('circle')
    .size(ctx.preview ? 14 : 20)
    .color('#ffd166');
  scene.addLayer(layer);

  const show = valuePanel(stage.container, 'tl');
  let min = 3;
  let max = 5;
  const report = (): void => show({ zoom: scene.getZoom().toFixed(2), range: `${min} - ${max}` });
  scene.on('zoomchange', report);
  report();

  if (stage.bar) {
    slider(stage.bar, 'setMinZoom', [0, 8, 0.5], min, (v) => ((min = v), layer.setMinZoom(v), scene.render(), report()));
    slider(stage.bar, 'setMaxZoom', [0, 10, 0.5], max, (v) => ((max = v), layer.setMaxZoom(v), scene.render(), report()));
  } else {
    // Cards: the camera zooms through the window; the layer only shows inside 3 - 5.
    stage.every(60, (i) => scene.setZoom(4 + Math.sin(i / 14) * 2.3));
  }

  return () => stage.dispose();
};

export default mount;
