// Mouse and component events logged live, plus dispatchAction driving highlight and tooltip
import type { Mount } from '@/types.ts';
import { createChart, controlBar, button, every } from '../../shared/chart.ts';

const items = ['Shirt', 'Sweater', 'Chiffon', 'Pants', 'Heels', 'Socks'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 320 });

  chart.setOption({
    tooltip: {},
    legend: ctx.preview ? { show: false } : {},
    // ECharts 6 puts the legend at the bottom by default, so the grid leaves room for it.
    grid: { top: ctx.preview ? 16 : 40, left: 36, right: 16, bottom: ctx.preview ? 24 : 60 },
    xAxis: { type: 'category', data: items },
    yAxis: {},
    series: [
      { name: 'Sales', type: 'bar', data: [5, 20, 36, 10, 10, 20], emphasis: { focus: 'series' } },
      { name: 'Returns', type: 'bar', data: [2, 6, 8, 3, 1, 4], emphasis: { focus: 'series' } },
    ],
  });

  let i = 0;
  const cycle = (): void => {
    // dispatchAction: the same state changes the mouse would cause, triggered from code.
    chart.dispatchAction({ type: 'downplay' });
    chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: i % items.length });
    chart.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: i % items.length });
    i += 1;
  };

  if (ctx.preview) {
    cycle();
    const stop = every(1000, cycle);
    return () => {
      stop();
      dispose();
    };
  }

  // Event log panel (full view only).
  const log = document.createElement('pre');
  Object.assign(log.style, {
    width: '100%', height: '130px', overflow: 'auto', margin: '8px 0 0', padding: '8px',
    fontSize: '12px', border: '1px solid #444', boxSizing: 'border-box',
  });
  el.append(log);
  const write = (line: string): void => {
    log.textContent = `${line}\n${log.textContent}`.split('\n').slice(0, 40).join('\n');
  };

  // Mouse events carry params: componentType, seriesName, name, dataIndex, value ...
  type Params = { seriesName?: string; name?: string; dataIndex?: number; value?: unknown };
  const describe = (p: Params): string => `${p.seriesName ?? ''} / ${p.name ?? ''} [${p.dataIndex}] = ${String(p.value)}`;
  chart.on('click', (p) => write(`click ${describe(p as Params)}`));
  // A query narrows a handler: only data items of series 'Returns'.
  chart.on('mouseover', { seriesName: 'Returns' }, (p) => write(`mouseover (Returns only) ${describe(p as Params)}`));
  // 'globalout' fires when the pointer leaves the chart.
  chart.on('globalout', () => write('globalout'));
  // Component events and the events actions produce.
  chart.on('legendselectchanged', (p) => write(`legendselectchanged ${(p as { name: string }).name}`));
  chart.on('highlight', () => write('highlight (from dispatchAction or hover)'));

  button(bar!, 'dispatchAction: highlight + showTip next', cycle);
  button(bar!, 'dispatchAction: legendToggleSelect Returns', () => chart.dispatchAction({ type: 'legendToggleSelect', name: 'Returns' }));
  button(bar!, 'clear log', () => {
    log.textContent = '';
  });

  return () => {
    for (const name of ['click', 'mouseover', 'globalout', 'legendselectchanged', 'highlight']) chart.off(name);
    dispose();
  };
};

export default mount;
