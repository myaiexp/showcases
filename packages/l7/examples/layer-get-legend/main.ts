// layer.getLegend('color'): { type, field, items } drawn as a legend panel
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { PARSER, grid, later, legendPanel } from '../../shared/layer-demo.ts';
import { cycle } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';

const FIELDS = ['v', 'delta'] as const;
const COLORS = ['#edf8fb', '#b2e2e2', '#66c2a4', '#238b45'];

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
    .size(ctx.preview ? 14 : 22)
    .scale('v', { type: 'quantize' })
    .scale('delta', { type: 'quantize' })
    .color('v', COLORS);
  scene.addLayer(layer);

  const draw = legendPanel(stage.container, 'br');
  const label = (x: unknown): string => (Array.isArray(x) ? x.map((n) => Math.round(Number(n))).join(' to ') : String(x));
  const read = (): void => {
    const legend = layer.getLegend('color') as { type?: string; field?: string; items?: { value: unknown; color: string }[] } | undefined;
    if (!legend?.items) return;
    draw(`${legend.type}: ${legend.field}`, legend.items.map((it) => ({ color: it.color, label: label(it.value) })));
  };
  const apply = (field: (typeof FIELDS)[number]): void => {
    layer.color(field, COLORS);
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
