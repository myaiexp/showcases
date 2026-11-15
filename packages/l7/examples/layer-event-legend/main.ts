// layer.on('legend:color' | 'legend:size'): a legend rebuilt whenever the mapping changes
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { PARSER, grid, legendPanel } from '../../shared/layer-demo.ts';
import { cycle } from '../../shared/point-data.ts';
import { eventBoard } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';

interface LegendEvent {
  type: string;
  field: string;
  items: { value?: unknown; color?: string; size?: number; [k: string]: unknown }[];
}

const FIELDS = ['v', 'delta'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.6 }),
  });
  await stage.ready(scene);

  const flash = eventBoard(stage.container, ['legend:color', 'legend:size']);
  const draw = legendPanel(stage.container, 'br');
  const layer = new PointLayer()
    .source(grid(ctx.preview ? 5 : 8, 4, [10, 46], 3.4), PARSER)
    .shape('circle')
    .scale('v', { type: 'quantize' })
    .scale('delta', { type: 'quantize' })
    .size(16);
  const fmt = (x: unknown): string => (Array.isArray(x) ? x.map((n) => (typeof n === 'number' ? Math.round(n) : n)).join(' - ') : String(x));
  layer.on('legend:color', (e: LegendEvent) => {
    flash('legend:color', e.field);
    draw(`color: ${e.field}`, e.items.map((it) => ({ color: it.color, label: fmt(it.value) })));
  });
  layer.on('legend:size', (e: LegendEvent) => flash('legend:size', e.field));
  scene.addLayer(layer);

  const apply = (field: (typeof FIELDS)[number]): void => {
    layer.color(field, ['#fde0dd', '#fa9fb5', '#c51b8a', '#7a0177']);
    layer.size(field, [8, ctx.preview ? 16 : 24]);
    scene.render();
  };
  if (stage.bar) select(stage.bar, 'field', FIELDS, 'v', apply);
  else cycle(stage, scene, FIELDS, 1400, apply);

  return () => stage.dispose();
};

export default mount;
