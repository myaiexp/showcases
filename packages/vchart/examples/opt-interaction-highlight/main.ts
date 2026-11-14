// interactions: element-highlight versus element-highlight-by-group, with the hover interaction off
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, readout, select } from '../../shared/chart.ts';
import { groupedRows } from '../../shared/components-data.ts';

const GROUPS = ['North', 'South', 'East'];
const rows = groupedRows(['Q1', 'Q2', 'Q3', 'Q4'], GROUPS, 21);

const spec = (type: string, preview: boolean): ISpec =>
  ({
    type: 'bar',
    data: [{ id: 'd', values: rows }],
    xField: ['x', 'c'],
    yField: 'y',
    seriesField: 'c',
    legends: { visible: !preview },
    hover: false,
    select: false,
    // The built-in states are named 'highlight' and 'blur'; highlightState and blurState rename them.
    interactions: [{ type, highlightState: 'highlight', blurState: 'blur', trigger: 'pointerover', triggerOff: 'pointerout' }],
    bar: { state: { highlight: { stroke: '#ffffff', lineWidth: 2 }, blur: { fillOpacity: 0.25 } } },
    tooltip: { visible: false },
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  let type = 'element-highlight';
  const bar = ctx.preview ? null : controlBar(el);
  const out = bar ? readout(el) : null;
  let chart = createChart(el, ctx, spec(type, ctx.preview));
  let alive = true;
  let stop = (): void => {};
  if (bar) {
    select(bar, 'type', ['element-highlight', 'element-highlight-by-group'], (v) => {
      type = v;
      chart.release();
      chart = createChart(el, ctx, spec(type, false));
      if (out) out.textContent = `interactions: [{ type: '${type}' }]`;
    });
    if (out) out.textContent = 'Point at a bar: one bar highlights, or the whole series with the by-group type.';
  } else {
    // A card has no pointer: set the same two states with updateState.
    let i = 0;
    stop = every(1000, () => {
      if (!alive) return;
      const g = GROUPS[i++ % (GROUPS.length + 1)];
      if (g === undefined) {
        chart.vchart.clearState('highlight');
        chart.vchart.clearState('blur');
        return;
      }
      void chart.vchart.updateState({
        highlight: { filter: (d) => d['c'] === g },
        blur: { filter: (d) => d['c'] !== g },
      });
    });
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
