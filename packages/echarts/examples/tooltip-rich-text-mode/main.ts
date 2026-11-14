// tooltip.renderMode 'html' versus 'richText': a DOM box or text drawn inside the chart canvas
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';
import { FINANCE, MONTHS } from '../../shared/interaction-data.ts';

interface Look { renderMode: 'html' | 'richText'; css: boolean; fontSize: number }

function build(look: Look): EChartsOption {
  return {
    tooltip: {
      trigger: 'axis',
      // renderMode: 'html' makes a DOM element; 'richText' paints the tooltip with the chart
      // itself, which is what environments without a DOM (mini programs) need.
      renderMode: look.renderMode,
      // extraCssText is raw CSS for the DOM box, so it has no effect in richText mode.
      extraCssText: look.css ? 'border-radius: 12px; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);' : '',
      backgroundColor: 'rgba(30, 60, 90, 0.92)',
      borderColor: '#5fb4ff',
      borderWidth: 1,
      padding: [8, 12],
      textStyle: { color: '#fff', fontSize: look.fontSize },
      // A string template works in both modes and needs no escaping.
      formatter: '{b0}<br />{a0}: {c0}<br />{a1}: {c1}',
    },
    legend: {},
    grid: { top: 30, left: 44, right: 16, bottom: 56 },
    xAxis: { type: 'category', data: MONTHS },
    yAxis: { type: 'value' },
    series: [
      { name: 'Revenue', type: 'line', data: FINANCE.revenue, smooth: true },
      { name: 'Cost', type: 'line', data: FINANCE.cost, smooth: true },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look: Look = { renderMode: 'richText', css: true, fontSize: 14 };
  const show = (): void => {
    chart.setOption(build(look), true);
  };
  show();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'renderMode', ['richText', 'html'], (v) => {
      look.renderMode = v as Look['renderMode'];
      show();
    });
    select(bar, 'textStyle.fontSize', ['14', '11', '18'], (v) => {
      look.fontSize = Number(v);
      show();
    });
    const css = button(bar, 'extraCssText: on', () => {
      look.css = !look.css;
      css.textContent = 'extraCssText: ' + (look.css ? 'on' : 'off');
      show();
    });
  } else {
    let i = 0;
    stop = every(1300, () => {
      i++;
      // Alternate the render mode every lap so both boxes are seen.
      if (i % 12 === 0) {
        look.renderMode = look.renderMode === 'html' ? 'richText' : 'html';
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
