// updateFullData: new values together with a new `fields` config for the same data id
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout, type ISpec } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const CATS = ['A', 'B', 'C', 'D', 'E'];
const values = (seed: number, max: number): { x: string; y: number }[] => {
  const r = rng(seed);
  return CATS.map((x) => ({ x, y: Math.round(10 + r() * (max - 10)) }));
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const spec = {
    type: 'bar',
    data: [{ id: 'd', values: values(1, 40) }],
    xField: 'x',
    yField: 'y',
    bar: { style: { cornerRadius: 3 } },
    label: { visible: true },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec);
  const out = bar ? readout(el) : null;

  let alive = true;
  let seed = 1;
  let locked = false;
  const send = (): void => {
    if (!alive) return;
    seed += 1;
    // With the domain locked the value axis stays at 0-100 for any values; unlocked, it follows the data.
    const fields = locked ? { y: { domain: [0, 100], lockStatisticsByDomain: true } } : {};
    vchart.updateFullData({ id: 'd', values: values(seed, locked ? 100 : 40), fields } as never);
    if (out) out.textContent = locked ? "fields: { y: { domain: [0, 100], lockStatisticsByDomain: true } }" : 'fields: {} (the axis follows the data)';
  };
  if (bar) {
    button(bar, 'New values, unlocked', () => {
      locked = false;
      send();
    });
    button(bar, 'New values, y locked to 0-100', () => {
      locked = true;
      send();
    });
    return () => {
      alive = false;
      release();
    };
  }
  const stop = every(2200, () => {
    locked = !locked;
    send();
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
