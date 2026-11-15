// layer.on('contextmenu'): a right click on a layer element
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
  for (const l of worldLayers()) scene.addLayer(l);

  const { data, stops } = targets(ctx.preview);
  const layer = new PointLayer().source(data, PARSER).shape('circle').size(ctx.preview ? 16 : 22).color('#7fb7ff');
  scene.addLayer(layer);

  const flash = eventBoard(stage.container, ['contextmenu']);
  const out = stage.readout();
  layer.on('contextmenu', (e: Parameters<typeof describe>[0]) => {
    flash('contextmenu', `#${e.featureId}`);
    if (out) out.textContent = describe(e);
  });

  if (stage.preview) {
    // The ghost has no right button: point it, then send the DOM contextmenu to the map by hand.
    const ghost = stage.ghost(scene);
    stage.every(700, (i) => {
      const p = stops[Math.floor((i - 1) / 2) % stops.length];
      if (i % 2) {
        if (p) ghost.moveTo(p);
        return;
      }
      const r = stage.container.getBoundingClientRect();
      const at = p ? scene.lngLatToContainer(p) : { x: 0, y: 0 };
      (stage.container.querySelector('.l7-canvas-container') ?? stage.container).dispatchEvent(
        new MouseEvent('contextmenu', { bubbles: true, cancelable: true, button: 2, clientX: r.left + at.x, clientY: r.top + at.y }),
      );
    });
  }

  return () => stage.dispose();
};

export default mount;
