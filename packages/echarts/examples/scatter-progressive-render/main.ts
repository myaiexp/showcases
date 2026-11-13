// Scatter progressive rendering: progressive and progressiveThreshold decide how many points are drawn per frame
import type { Mount } from '@/types.ts';
import { createChart, controlBar, button, select, slider, every } from '../../shared/chart.ts';
import { blobs } from '../../shared/scatter-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const count = ctx.preview ? 20000 : 80000;
  let seed = 3;
  let progressive = ctx.preview ? 300 : 400;
  let threshold = 3000;

  const show = (): void => {
    chart.setOption(
      {
        // The first draw is the interesting part, so the initial animation is off and
        // each setOption with new data replaces the points chunk by chunk.
        animation: false,
        grid: { top: 16, left: 40, right: 16, bottom: 28 },
        xAxis: { type: 'value', min: 0, max: 100 },
        yAxis: { type: 'value', min: 0, max: 100 },
        series: [
          {
            type: 'scatter',
            data: blobs(count, seed, seed % 3 * 6),
            symbolSize: 4,
            itemStyle: { opacity: 0.55 },
            // progressive: points drawn per frame (about 16 ms) once progressive rendering is on.
            // 0 disables it for good, so the whole series is drawn in one go.
            progressive,
            // progressiveThreshold: progressive rendering starts above this many points.
            progressiveThreshold: threshold,
          },
        ],
      },
      true,
    );
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(2500, () => {
      seed++;
      show();
    });
  } else {
    select(bar!, 'progressive', ['400', '100', '2000', '20000', '0'], (v) => {
      progressive = Number(v);
    });
    slider(bar!, 'progressiveThreshold', [1000, 100000, 1000], threshold, (v) => {
      threshold = v;
    });
    button(bar!, 'redraw with new data', () => {
      seed++;
      show();
    });
    const note = document.createElement('span');
    note.textContent = `${count.toLocaleString()} points. Pick the values, then redraw: with a small progressive the points appear in waves; progressive 0 draws all at once.`;
    bar!.append(note);
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
