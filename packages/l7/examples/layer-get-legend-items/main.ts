// layer.getLegendItems('color') and ('size'): the legend entries behind a mapping
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { PARSER, grid, later } from '../../shared/layer-demo.ts';
import { cycle } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';

const FIELDS = ['v', 'delta'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.6 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source(grid(ctx.preview ? 5 : 8, 4, [10, 46], 3.4), PARSER)
    .shape('circle')
    .scale('v', { type: 'quantize' })
    .scale('delta', { type: 'quantize' })
    .color('v', ['#fef0d9', '#fdcc8a', '#fc8d59', '#d7301f'])
    .size('v', [8, ctx.preview ? 16 : 24]);
  scene.addLayer(layer);

  const panel = document.createElement('pre');
  panel.style.cssText = 'position:absolute;left:6px;bottom:6px;z-index:4;margin:0;padding:4px 8px;border-radius:4px;background:rgba(10,16,24,.88);color:#cfe3f7;font:10px/1.4 ui-monospace,monospace;pointer-events:none;max-width:70%;overflow:hidden';
  stage.container.append(panel);
  const fmt = (v: unknown): string => JSON.stringify(v, (_k, x) => (typeof x === 'number' ? Math.round(x * 10) / 10 : x));
  const read = (): void => {
    const color = layer.getLegendItems('color') as unknown[] | undefined;
    const size = layer.getLegendItems('size') as unknown[] | undefined;
    panel.textContent = ["getLegendItems('color')", ...(color ?? []).map((it) => ` ${fmt(it)}`), "getLegendItems('size')", ...(size ?? []).map((it) => ` ${fmt(it)}`)].join('\n');
  };
  const apply = (field: (typeof FIELDS)[number]): void => {
    layer.color(field, ['#fef0d9', '#fdcc8a', '#fc8d59', '#d7301f']);
    layer.size(field, [8, ctx.preview ? 16 : 24]);
    scene.render();
    // The scales are rebuilt while the layer renders, so read the legend a moment later.
    later(stage, read);
  };
  later(stage, read, 400);
  if (stage.bar) select(stage.bar, 'field', FIELDS, 'v', apply);
  else cycle(stage, scene, FIELDS, 1500, apply);

  return () => stage.dispose();
};

export default mount;
