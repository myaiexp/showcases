// A value axis with a torn-paper break that collapses the empty range between outliers
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const visits = [132, 158, 3240, 171, 119, 4060, 146];

// start/end identify the break; they must stay the same for later updates to animate.
const BREAK = { start: 400, end: 3000 };

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  chart.setOption({
    tooltip: { trigger: 'axis' },
    grid: ctx.preview ? { top: 20, bottom: 24, left: 44, right: 12 } : undefined,
    xAxis: { type: 'category', data: days },
    yAxis: {
      type: 'value',
      // yAxis.breaks: [start, end] is drawn as a band `gap` long. A percentage keeps the
      // band the same size whatever the axis extent.
      breaks: [{ ...BREAK, gap: '6%' }],
      breakArea: {
        // The torn edges: tooth height and the random range of tooth widths, in pixels.
        zigzagAmplitude: 5,
        zigzagMinSpan: 6,
        zigzagMaxSpan: 18,
        itemStyle: { opacity: 0.25 },
        // Clicking the band expands it back to the true scale (the default).
        expandOnClick: true,
      },
    },
    series: [{ type: 'bar', data: visits, label: { show: !ctx.preview, position: 'top' } }],
  });

  // toggleAxisBreak names the break by its start/end; it cannot create a new one.
  const toggle = (): void => {
    chart.dispatchAction({ type: 'toggleAxisBreak', yAxisIndex: 0, breaks: [BREAK] });
  };

  if (ctx.preview) {
    const stop = every(2600, toggle);
    return () => {
      stop();
      dispose();
    };
  }

  button(bar!, 'Toggle break', toggle);
  const status = document.createElement('span');
  status.textContent = 'Collapsed. Click the torn band, or the button, to expand it.';
  bar!.append(status);

  // Every expand / collapse / toggle fires axisbreakchanged with the new state.
  chart.on('axisbreakchanged', (event) => {
    const e = event as { breaks: { isExpanded: boolean }[] };
    status.textContent = e.breaks[0]?.isExpanded ? 'Expanded: the true scale.' : 'Collapsed: 400 to 3000 skipped.';
  });

  return dispose;
};

export default mount;
