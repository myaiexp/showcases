// layer.on('dblclick'): a double click on a layer element
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { PARSER, describe, targets } from '../../shared/layer-demo.ts';
import { eventBoard } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3.2 : 4 }),
  });
  await stage.ready(scene);
  // A double click would zoom the map in on every pair; the layer event still fires without it.
  scene.setMapStatus({ doubleClickZoom: false });
  for (const l of worldLayers()) scene.addLayer(l);

  const { data, stops } = targets(ctx.preview);
  const layer = new PointLayer().source(data, PARSER).shape('circle').size(ctx.preview ? 16 : 22).color('#ff6b6b');
  scene.addLayer(layer);

  const flash = eventBoard(stage.container, ['click', 'dblclick']);
  const out = stage.readout();
  for (const name of ['click', 'dblclick'] as const) {
    layer.on(name, (e: Parameters<typeof describe>[0]) => {
      flash(name);
      if (out) out.textContent = describe(e);
    });
  }

  if (stage.preview) {
    const ghost = stage.ghost(scene);
    stage.every(900, (i) => {
      const p = stops[i % stops.length];
      if (i % 2) {
        if (p) ghost.moveTo(p);
      } else ghost.dblclick();
    });
  }

  return () => stage.dispose();
};

export default mount;
