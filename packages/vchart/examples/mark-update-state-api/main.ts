// updateState: a custom state is declared in the spec, then switched on with vchart.updateState
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const TYPES = ['a', 'b', 'c'];
const rand = seeded(17);
const values = [1, 2, 3, 4, 5].flatMap((x) => TYPES.map((type) => ({ x, y: Math.round(10 + rand() * 80), type })));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, {
    type: 'scatter',
    data: [{ id: 'data1', values }],
    xField: 'x',
    yField: 'y',
    seriesField: 'type',
    point: { style: { size: 18 }, state: { custom_unSelected: { style: { fillOpacity: 0.15, size: 10 } } } },
  });
  let alive = true;
  const highlight = (type: string): void => {
    if (alive) vchart.updateState({ custom_unSelected: { filter: (datum) => datum['type'] !== type } });
  };
  const out = bar ? readout(el) : null;
  let off = (): void => {};
  let stop = (): void => {};
  if (bar && out) {
    out.textContent = 'Click a point to dim every point of the other series.';
    const onClick = (e: { datum?: { type?: string } }): void => {
      const type = e.datum?.type;
      if (type === undefined) return;
      highlight(type);
      out.textContent = `updateState: custom_unSelected for type !== '${type}'`;
    };
    vchart.on('click', { level: 'mark' }, onClick as never);
    off = () => vchart.off('click', onClick as never);
    for (const t of TYPES) button(bar, `Highlight ${t}`, () => highlight(t));
    button(bar, 'clearState', () => vchart.clearState('custom_unSelected'));
  } else {
    let i = 0;
    stop = every(1200, () => {
      if (!alive) return;
      if (i % 4 === 3) vchart.clearState('custom_unSelected');
      else highlight(TYPES[i % 4] ?? 'a');
      i++;
    });
  }
  return () => {
    alive = false;
    stop();
    off();
    release();
  };
};

export default mount;
