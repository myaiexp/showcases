// Legend-driven states: element-highlight-by-legend and element-active-by-legend
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, readout, select } from '../../shared/chart.ts';
import { groupedRows } from '../../shared/components-data.ts';

const GROUPS = ['North', 'South', 'East'];
const rows = groupedRows(['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'], GROUPS, 4);

const spec = (type: string, preview: boolean): ISpec =>
  ({
    type: 'line',
    data: [{ id: 'd', values: rows }],
    xField: 'x',
    yField: 'y',
    seriesField: 'c',
    legends: { visible: !preview },
    hover: false,
    interactions: [
      // filterType 'groupKey': the legend item's key is compared with each element's series key.
      { type, filterType: 'groupKey', markNames: ['line', 'point'], trigger: 'pointerover', triggerOff: 'pointerout' },
    ],
    line: { style: { lineWidth: 2 }, state: { highlight: { lineWidth: 6 }, blur: { strokeOpacity: 0.2 }, active: { lineWidth: 6, lineDash: [8, 4] } } },
    point: { state: { highlight: { size: 14 }, blur: { fillOpacity: 0.2 }, active: { size: 14 } } },
    tooltip: { visible: false },
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  let type = 'element-highlight-by-legend';
  const bar = ctx.preview ? null : controlBar(el);
  const out = bar ? readout(el) : null;
  let chart = createChart(el, ctx, spec(type, ctx.preview));
  let alive = true;
  let stop = (): void => {};
  if (bar) {
    select(bar, 'type', ['element-highlight-by-legend', 'element-active-by-legend'], (v) => {
      type = v;
      chart.release();
      chart = createChart(el, ctx, spec(type, false));
      if (out) out.textContent = `interactions: [{ type: '${type}', filterType: 'groupKey' }]`;
    });
    if (out) out.textContent = 'Point at a legend item: its line takes the highlight (others blur) or the active state.';
  } else {
    let i = 0;
    stop = every(1000, () => {
      if (!alive) return;
      const g = GROUPS[i++ % (GROUPS.length + 1)];
      if (g === undefined) {
        chart.vchart.clearState('highlight');
        chart.vchart.clearState('blur');
        return;
      }
      void chart.vchart.updateState({ highlight: { filter: (d) => d['c'] === g }, blur: { filter: (d) => d['c'] !== g } });
    });
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
