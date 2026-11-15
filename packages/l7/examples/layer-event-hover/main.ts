// layer.on('mouseenter' | 'mousemove' | 'mouseout'): hover events on a layer
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { PARSER, describe, targets, tour } from '../../shared/layer-demo.ts';
import { eventBoard } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const NAMES = ['mouseenter', 'mousemove', 'mouseout'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3.2 : 4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const { data, stops, gap } = targets(ctx.preview);
  const layer = new PointLayer().source(data, PARSER).shape('circle').size(ctx.preview ? 16 : 22).color('#ffd166').active({ color: '#ff6b6b', mix: 0.3 });
  scene.addLayer(layer);

  const flash = eventBoard(stage.container, NAMES);
  const out = stage.readout();
  for (const name of NAMES) {
    layer.on(name, (e: Parameters<typeof describe>[0]) => {
      flash(name);
      if (out) out.textContent = describe(e);
    });
  }

  if (stage.preview) tour(stage, scene, [stops[0], stops[1], gap, stops[2] ?? stops[0]].filter((p): p is [number, number] => !!p), { clickEvery: 99 });

  return () => stage.dispose();
};

export default mount;
