// trace.ids lets Plotly match a point before and after an animation, so it moves instead of morphing
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/stat-data.ts';
import { button, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const SLOTS: [number, number][] = [[1, 0], [0.5, 0.866], [-0.5, 0.866], [-1, 0], [-0.5, -0.866], [0.5, -0.866]];
const COLORS = ['#631357', '#AD1457', '#F06292', '#60a5fa', '#34d399', '#f59e0b'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const rand = rng(191);
  let order = [0, 1, 2, 3, 4, 5];
  let useIds = true;

  const frame = (): Record<string, unknown> => ({
    x: order.map((k) => SLOTS[k]![0]),
    y: order.map((k) => SLOTS[k]![1]),
    'marker.color': order.map((k) => COLORS[k]),
    ...(useIds ? { ids: order.map(String) } : {}),
  });
  const draw = (): Promise<unknown> =>
    Plotly.newPlot(
      stage.div,
      [{ ...(frame() as object), mode: 'markers', marker: { size: stage.preview ? 18 : 26, color: order.map((k) => COLORS[k]) } } as never],
      { template: stage.template, xaxis: { range: [-2, 2], zeroline: false }, yaxis: { range: [-1.6, 1.6], zeroline: false } },
      stage.config,
    );
  await draw();

  const shuffle = (): void => {
    const next = [...order];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [next[i], next[j]] = [next[j]!, next[i]!];
    }
    order = next;
    void Plotly.animate(stage.div, { data: [frame()], traces: [0] } as never, { transition: { duration: 800, easing: 'cubic-in-out' }, frame: { duration: 800 } }).catch(() => {});
  };
  if (stage.bar) {
    button(stage.bar, 'Shuffle', shuffle);
    toggle(stage.bar, 'use ids', true, (v) => ((useIds = v), void draw()));
  }
  if (stage.preview) stage.every(1200, shuffle);

  return () => stage.dispose();
};

export default mount;
