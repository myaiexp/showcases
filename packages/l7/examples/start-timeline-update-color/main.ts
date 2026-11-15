// layer.color('day-N', setColor) then scene.render(): one column per time step
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { regions } from '../../shared/polygon-data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';

const COLORS = ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026'];
const DAYS = 12;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 50], zoom: ctx.preview ? 2.5 : 3.3 }),
  });
  await stage.ready(scene);

  // Every country carries one column per day: day0 ... day11.
  const data = regions();
  data.features.forEach((f, i) => {
    const props = f.properties as unknown as Record<string, number>;
    for (let d = 0; d < DAYS; d++) props[`day${d}`] = Math.round(20000 * (1 + Math.sin(d / 2 + i)) * (1 + (i % 5) / 5) * (0.4 + d / 8));
  });
  const setColor = (v: number): string => COLORS[Math.min(COLORS.length - 1, Math.floor(v / 8000))] ?? COLORS[0]!;
  const layer = new PolygonLayer({}).source(data).color('day0', setColor);
  scene.addLayer(layer);

  const show = valuePanel(stage.container, 'tl');
  const set = (d: number): void => {
    layer.color(`day${d}`, setColor);
    scene.render();
    show({ color: `'day${d}'` });
  };
  if (stage.bar) slider(stage.bar, 'day', [0, DAYS - 1, 1], 0, set);
  else stage.every(500, (i) => set(i % DAYS));

  return () => stage.dispose();
};

export default mount;
