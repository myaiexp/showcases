// Heatmap cells with value labels: label.formatter, itemStyle gaps and rounded cells, and labelLayout hideOverlap on dense grids
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';
import { rng } from '../../shared/scatter-data.ts';

const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'];

/** [column, row, value] cells for a `cols` by `rows` grid. */
function cells(cols: number, rows: number, seed: number): number[][] {
  const r = rng(seed);
  const out: number[][] = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) out.push([x, y, Math.round(100 * (0.5 + 0.5 * Math.sin(x * 0.7 + y * 0.9 + seed)) * (0.6 + 0.4 * r()))]);
  return out;
}

const FORMATS: Record<string, (v: number) => string> = {
  value: (v) => String(v),
  'percent of 100': (v) => `${v}%`,
  'one decimal': (v) => (v / 10).toFixed(1),
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });
  let seed = 1;
  let cols = 8;
  let format = 'value';
  let gap = 2;
  let hide = false;
  let fontSize = 12;
  const rows = ctx.preview ? 5 : 7;

  const show = (): void => {
    const f = FORMATS[format]!;
    chart.setOption(
      {
        grid: { top: 12, left: 36, right: 16, bottom: ctx.preview ? 28 : 60 },
        xAxis: { type: 'category', data: COLS.slice(0, cols), splitArea: { show: false } },
        yAxis: { type: 'category', data: Array.from({ length: rows }, (_, i) => `r${i + 1}`), inverse: true },
        visualMap: { show: false, min: 0, max: 100, inRange: { color: ['#26456e', '#3b82c4', '#f2e394', '#f29e4c'] } },
        series: [
          {
            type: 'heatmap',
            data: cells(cols, rows, seed),
            // label: the text drawn in each cell; position defaults to 'inside' for heatmap.
            label: {
              show: true,
              fontSize,
              color: '#fff',
              // A dark outline keeps the text readable on both pale and dark cells.
              textBorderColor: 'rgba(0,0,0,0.6)',
              textBorderWidth: 2,
              formatter: (p: { value: unknown }) => f((p.value as number[])[2]!),
            },
            // labelLayout.hideOverlap drops labels that would collide with a neighbour.
            labelLayout: { hideOverlap: hide },
            // itemStyle: a border in the background colour reads as a gap between cells.
            itemStyle: { borderColor: '#1a1d24', borderWidth: gap, borderRadius: 3 },
            emphasis: { itemStyle: { borderColor: '#fff', borderWidth: 1 } },
          },
        ],
      },
      true,
    );
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const names = Object.keys(FORMATS);
    let i = 0;
    stop = every(1500, () => {
      i++;
      seed++;
      format = names[i % names.length]!;
      show();
    });
  } else {
    select(bar!, 'label.formatter', Object.keys(FORMATS), (v) => {
      format = v;
      show();
    });
    select(bar!, 'columns', ['8', '16', '24'], (v) => {
      cols = Number(v);
      show();
    });
    slider(bar!, 'label.fontSize', [8, 20, 1], fontSize, (v) => {
      fontSize = v;
      show();
    });
    slider(bar!, 'itemStyle.borderWidth', [0, 6, 1], gap, (v) => {
      gap = v;
      show();
    });
    select(bar!, 'labelLayout.hideOverlap', ['false', 'true'], (v) => {
      hide = v === 'true';
      show();
    });
    select(bar!, 'data', ['set A', 'set B', 'set C'], (v) => {
      seed = 1 + (v.charCodeAt(4) - 65) * 3;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
