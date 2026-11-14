// VChart.globalConfig.uniqueTooltip: one tooltip at a time across charts, or one per chart
import VChart from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';
import { barSpec, rows } from '../../shared/api-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:12px;width:100%';
  el.append(row);
  const cells = [0, 1].map(() => {
    const c = document.createElement('div');
    c.style.cssText = 'flex:1 1 0;min-width:0';
    row.append(c);
    return c;
  });
  const opts = { previewHeight: 200, height: 300 };
  const charts = cells.map((cell, i) =>
    createChart(el, ctx, barSpec({ id: `d${i}`, seed: i + 1, legend: false, extra: { tooltip: { mark: { visible: true } } } }), { ...opts, parent: cell }),
  );
  const out = bar ? readout(el) : null;

  // The setting is global to the page, so remember what it was and put it back afterwards.
  const original = VChart.globalConfig.uniqueTooltip;
  let alive = true;
  const report = (): void => {
    if (out) out.textContent = `VChart.globalConfig.uniqueTooltip = ${String(VChart.globalConfig.uniqueTooltip)}`;
  };
  const showOn = (i: number): void => {
    if (!alive) return;
    const chart = charts[i];
    const datum = rows(i + 1).find((r) => r.x === 'Q2' && r.c === 'North');
    if (chart && datum) chart.vchart.showTooltip(datum as never, { alwaysShow: true, x: 80, y: 60 } as never);
  };
  const both = (): void => {
    showOn(0);
    window.setTimeout(() => showOn(1), 300);
  };
  if (bar) {
    button(bar, 'uniqueTooltip = true', () => {
      VChart.globalConfig.uniqueTooltip = true;
      report();
    });
    button(bar, 'uniqueTooltip = false', () => {
      VChart.globalConfig.uniqueTooltip = false;
      report();
    });
    button(bar, 'Show a tooltip on each chart', both);
    report();
  }
  let k = 0;
  const stop = bar
    ? () => {}
    : every(2200, () => {
        VChart.globalConfig.uniqueTooltip = k++ % 2 === 0;
        charts.forEach((c) => c.vchart.hideTooltip());
        both();
      });
  return () => {
    alive = false;
    stop();
    VChart.globalConfig.uniqueTooltip = original;
    charts.forEach((c) => c.release());
    row.remove();
  };
};

export default mount;
