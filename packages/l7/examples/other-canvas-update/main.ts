// CanvasLayer style update: 'always' or 'dragend'
import { CanvasLayer, type ICanvasLayerRenderParams, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { drift } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 47], zoom: ctx.preview ? 3 : 3.8 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const draw = (option: ICanvasLayerRenderParams): void => {
    const { size, mapService } = option;
    const g = option.ctx as CanvasRenderingContext2D;
    g.clearRect(0, 0, size[0], size[1]);
    g.fillStyle = '#4ecdc4';
    for (let lng = -10; lng <= 40; lng += 3) {
      for (let lat = 35; lat <= 60; lat += 3) {
        const { x, y } = mapService.lngLatToContainer([lng, lat]);
        g.beginPath();
        g.arc(x, y, 3, 0, Math.PI * 2);
        g.fill();
      }
    }
  };
  const layer = new CanvasLayer({}).style({ update: 'always', drawingOnCanvas: draw });
  scene.addLayer(layer);

  const set = (update: 'always' | 'dragend'): void => {
    layer.style({ update });
  };
  if (stage.bar) select(stage.bar, 'update', ['always', 'dragend'] as const, 'always', set);
  else drift(stage, scene, [10, 47], 6);

  return () => stage.dispose();
};

export default mount;
