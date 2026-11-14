// Scatter with large and largeThreshold on tens of thousands of points, plus per-item styles that large mode ignores
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, button, select, every } from '../../shared/chart.ts';
import { blobs } from '../../shared/scatter-data.ts';

interface Look { large: boolean; threshold: number }

function build(points: number[][], look: Look, preview: boolean): EChartsOption {
  // Three marked points carry their own itemStyle. In large mode a single item's style
  // can't be customised any more, so they only turn red and big when large is off.
  const marked = [0, 1, 2].map((i) => ({ value: [20 + i * 25, 85 - i * 10], symbolSize: 14, itemStyle: { color: '#ff4d4f' } }));
  return {
    animation: false,
    tooltip: { show: !preview },
    grid: { top: 16, left: 40, right: 16, bottom: preview ? 28 : 40 },
    xAxis: { type: 'value', min: 0, max: 100 },
    yAxis: { type: 'value', min: 0, max: 100 },
    series: [
      {
        type: 'scatter',
        data: [...points, ...marked],
        symbolSize: 3,
        itemStyle: { opacity: 0.5 },
        // large: draw the series with the large-data optimisation.
        large: look.large,
        // largeThreshold: the optimisation only starts when there are more points than this.
        largeThreshold: look.threshold,
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const count = ctx.preview ? 15000 : 60000;
  let points = blobs(count, 7);
  const look: Look = { large: true, threshold: 2000 };
  const show = (): void => {
    chart.setOption(build(points, look, ctx.preview));
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    // The blobs drift between a few layouts so the card keeps changing.
    let step = 0;
    stop = every(1500, () => {
      points = blobs(count, 7, [0, 10, 20, 10][++step % 4]!);
      show();
    });
  } else {
    const t = button(bar!, 'large: on', () => {
      look.large = !look.large;
      t.textContent = `large: ${look.large ? 'on' : 'off'}`;
      show();
    });
    select(bar!, 'largeThreshold', ['2000', '100000'], (v) => {
      look.threshold = Number(v);
      show();
    });
    button(bar!, 'new data', () => {
      points = blobs(count, Math.floor(Math.random() * 1e6));
      show();
    });
    const note = document.createElement('span');
    note.textContent = `${count.toLocaleString()} points. With large off (or the threshold above the count) the three red marker points get their own style.`;
    bar!.append(note);
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
