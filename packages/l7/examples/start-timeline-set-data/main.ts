// layer.setData(dayN): a new GeoJSON per time step, same colour mapping
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { regions } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { valuePanel } from '../../shared/scene-board.ts';

const COLORS = ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 50], zoom: ctx.preview ? 2.5 : 3.3 }),
  });
  await stage.ready(scene);

  // One value per country per day (stands in for the docs' per-state COVID CSV).
  const base = regions();
  const day = (d: number): ReturnType<typeof regions> => ({
    ...base,
    features: base.features.map((f, i) => ({
      ...f,
      properties: { ...f.properties, cases: Math.round(20000 * (1 + Math.sin(d / 3 + i)) * (1 + (i % 5) / 5) * (0.4 + d / 14)) },
    })),
  });
  const setColor = (v: number): string => COLORS[Math.min(COLORS.length - 1, Math.floor(v / 8000))] ?? COLORS[0]!;
  const layer = new PolygonLayer({}).source(day(0)).color('cases', setColor);
  scene.addLayer(layer);

  const show = valuePanel(stage.container, 'tl');
  const set = (d: number): void => {
    layer.setData(day(d));
    show({ day: String(d) });
  };
  if (stage.bar) slider(stage.bar, 'day', [0, 30, 1], 0, set);
  else stage.every(400, (i) => set(i % 31));

  return () => stage.dispose();
};

export default mount;
