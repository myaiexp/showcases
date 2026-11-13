// Correlation heatmap laid out on the matrix coordinate system with two-level headers
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { GROUPS, correlations, series } from './data.ts';

const mount: Mount = (el, ctx) => {
  const { chart, dispose } = createChart(el, ctx, { height: 520 });

  const render = (seed: number): void => {
    chart.setOption({
      tooltip: { show: !ctx.preview },
      // matrix.x / matrix.y: header cells. A tree in `data` gives a two-level header
      // ('Weather' spanning Temp, Rain, Wind); the leaves become the columns and rows.
      matrix: {
        left: ctx.preview ? 4 : 40,
        right: ctx.preview ? 4 : 110,
        top: ctx.preview ? 4 : 30,
        bottom: ctx.preview ? 4 : 30,
        x: { data: GROUPS, show: !ctx.preview },
        y: { data: GROUPS, show: !ctx.preview },
        // Body and corner cells can be styled; the corner is merged into one empty cell.
        corner: { data: [{ coord: [[-2, -1], [-2, -1]], mergeCells: true, value: 'Pearson r' }] },
      },
      visualMap: {
        min: -1,
        max: 1,
        calculable: true,
        show: !ctx.preview,
        right: 10,
        top: 'middle',
        inRange: { color: ['#3b6fd8', '#1b1f2a', '#e0533c'] },
      },
      series: [
        {
          type: 'heatmap',
          // Each item [x, y, value] is placed in the body cell whose headers match x and y.
          coordinateSystem: 'matrix',
          data: correlations(series(seed)),
          label: { show: true, fontSize: ctx.preview ? 9 : 12 },
        },
      ],
    });
  };

  let seed = 11;
  render(seed);
  // A new sample every few seconds: the colours and labels animate to the new values.
  const stop = every(ctx.preview ? 2500 : 4000, () => render(++seed));

  return () => {
    stop();
    dispose();
  };
};

export default mount;
