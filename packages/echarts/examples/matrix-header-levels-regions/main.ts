// A weekly timetable on a matrix: header levels and sizes, divider lines, and merged, styled body regions
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, slider, button, every } from '../../shared/chart.ts';

interface Look { weekRow: number; dayRow: number; wedWidth: number; divider: boolean; merged: boolean }

function build(look: Look, preview: boolean): EChartsOption {
  const dim = (color: string): Record<string, unknown> => ({ itemStyle: { color, borderColor: '#1a1d24', borderWidth: 2 }, label: { color: '#fff', fontWeight: 'bold' } });
  return {
    animationDurationUpdate: 300,
    matrix: {
      left: 8,
      right: 8,
      top: 8,
      bottom: 8,
      // x.data is a tree: the parents ('Week 1', 'Week 2') are one header row above the leaf days.
      // A data item's size sets that column's width in px or %, instead of an even split.
      x: {
        data: [
          { value: 'Week 1', children: [{ value: 'Mon' }, { value: 'Tue' }, { value: 'Wed', size: look.wedWidth }] },
          { value: 'Week 2', children: [{ value: 'Thu' }, { value: 'Fri' }] },
        ],
        // levels[i].levelSize is the height of header row i (week row first, then the day row).
        levels: [{ levelSize: look.weekRow }, { levelSize: look.dayRow }],
        label: { color: '#cdd6e6', fontSize: preview ? 11 : 13 },
        // dividerLineStyle: the line between header cells and the body.
        dividerLineStyle: { color: look.divider ? '#f0b74a' : '#555', width: look.divider ? 3 : 1 },
      },
      // y.levelSize is the width of the single row-label column.
      y: {
        data: ['9:00', '10:00', '11:00', '13:00', '14:00'],
        levelSize: 56,
        label: { color: '#9aa7bd', fontSize: preview ? 10 : 12 },
      },
      // A named corner cell merged over the header intersection. Corner locators are negative:
      // x -1 is the one row-header column, y -2..-1 the two column-header levels.
      corner: { data: [{ coord: [-1, [-2, -1]], mergeCells: true, value: preview ? '' : 'Time' }], label: { color: '#9aa7bd' } },
      backgroundStyle: { borderColor: '#555' },
      // body.data: only the special cells. coord [x, y] or [[x0, x1], [y0, y1]] picks a rectangle;
      // mergeCells joins it into one cell that shows `value`; the style options colour it.
      body: {
        data: [
          { coord: [[0, 1], 0], mergeCells: look.merged, value: 'Planning', ...dim('#3d6fb5') },
          { coord: [2, [0, 1]], mergeCells: look.merged, value: 'Workshop', ...dim('#2e8b6a') },
          { coord: [[3, 4], [2, 3]], mergeCells: look.merged, value: 'Review', ...dim('#b5563d') },
          { coord: [0, 4], value: 'Gym', ...dim('#7a5aa6') },
        ],
      },
    },
  };
}

const mount: Mount = (el, ctx) => {
  const look: Look = { weekRow: 28, dayRow: 28, wedWidth: 120, divider: true, merged: true };
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 420 });
  const show = (): void => {
    chart.setOption(build(look, ctx.preview));
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const frames = [
      { weekRow: 20, dayRow: 20, wedWidth: 70 },
      { weekRow: 30, dayRow: 24, wedWidth: 120 },
      { weekRow: 16, dayRow: 30, wedWidth: 50 },
    ];
    let i = 0;
    stop = every(1500, () => {
      Object.assign(look, frames[++i % frames.length], { merged: i % 4 !== 0 });
      show();
    });
  } else {
    slider(bar!, 'week row height', [16, 60, 1], look.weekRow, (v) => {
      look.weekRow = v;
      show();
    });
    slider(bar!, 'day row height', [16, 60, 1], look.dayRow, (v) => {
      look.dayRow = v;
      show();
    });
    slider(bar!, 'Wed size', [40, 260, 5], look.wedWidth, (v) => {
      look.wedWidth = v;
      show();
    });
    const dv = button(bar!, 'dividerLineStyle: accent', () => {
      look.divider = !look.divider;
      dv.textContent = `dividerLineStyle: ${look.divider ? 'accent' : 'default'}`;
      show();
    });
    const mg = button(bar!, 'mergeCells: on', () => {
      look.merged = !look.merged;
      mg.textContent = `mergeCells: ${look.merged ? 'on' : 'off'}`;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
