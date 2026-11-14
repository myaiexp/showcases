// tooltip content three ways: default with valueFormatter, a string template, a callback returning HTML
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, echarts, every, select } from '../../shared/chart.ts';
import { FINANCE, MONTHS } from '../../shared/interaction-data.ts';

const MODES = ['callback (HTML)', 'string template', 'default + valueFormatter'] as const;
type Mode = (typeof MODES)[number];

interface Param { marker?: string; seriesName?: string; value?: unknown; axisValueLabel?: string }

function build(mode: Mode, order: string): EChartsOption {
  const tooltip: NonNullable<EChartsOption['tooltip']> = {
    trigger: 'axis',
    // order: how the series are sorted inside the tooltip.
    order: order as 'seriesAsc',
  };
  if (mode === 'default + valueFormatter') {
    // valueFormatter (5.3): formats only the value part; the layout stays the default one.
    // dataIndex is the index in the full data, even while a dataZoom filters it.
    tooltip.valueFormatter = (value, dataIndex) => '$' + Number(value).toFixed(1) + 'k (#' + (dataIndex + 1) + ')';
  } else if (mode === 'string template') {
    // {b0} is the category of the first series, {a1}/{c1} the name and value of the second.
    tooltip.formatter = '{b0}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}';
  } else {
    // A callback may return HTML; anything user-supplied must go through encodeHTML.
    tooltip.formatter = (raw) => {
      const params = raw as Param[];
      const e = echarts.format.encodeHTML;
      const rows = params
        .map((p) => {
          const v = Number(p.value);
          return '<div style="display:flex;justify-content:space-between;gap:16px">' + (p.marker ?? '')
            + '<span>' + e(p.seriesName ?? '') + '</span><b>' + v + '</b></div>'
            + '<div style="height:3px;margin:2px 0 4px;background:#888;width:' + Math.max(4, v / 2.4) + 'px"></div>';
        })
        .join('');
      return '<div style="font-weight:600;margin-bottom:4px">' + e(params[0]?.axisValueLabel ?? '') + '</div>' + rows;
    };
  }
  return {
    tooltip,
    legend: {},
    grid: { top: 30, left: 44, right: 16, bottom: 56 },
    xAxis: { type: 'category', data: MONTHS },
    yAxis: { type: 'value' },
    series: [
      { name: 'Revenue', type: 'bar', data: FINANCE.revenue },
      { name: 'Cost', type: 'bar', data: FINANCE.cost },
      { name: 'Profit', type: 'line', data: FINANCE.profit, smooth: true },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let mode: Mode = 'callback (HTML)';
  let order = 'seriesAsc';
  const show = (): void => {
    chart.setOption(build(mode, order), true);
  };
  show();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'tooltip content', MODES, (v) => {
      mode = v as Mode;
      show();
    });
    select(bar, 'order', ['seriesAsc', 'seriesDesc', 'valueAsc', 'valueDesc'], (v) => {
      order = v;
      show();
    });
  } else {
    // No pointer in a card: showTip walks the tooltip along the months, switching content now and then.
    let i = 0;
    stop = every(1400, () => {
      i++;
      if (i % 12 === 0) {
        mode = MODES[(i / 12) % 3]!;
        show();
      }
      chart.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: i % 12 });
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
