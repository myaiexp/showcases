// opacity versus fillOpacity versus strokeOpacity on rect marks over a stripe
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { swatchGrid, type SwatchRow } from '../../shared/opt-swatch.ts';

const CHANNELS = ['opacity', 'fillOpacity', 'strokeOpacity'];

interface Row extends SwatchRow {
  channel: string;
  value: number;
}

const mount: Mount = (el, ctx) => {
  const state = { value: 0.4 };
  const rows = (): Row[] => CHANNELS.map((channel, i) => ({ i, label: channel, channel, value: state.value }));
  const bar = ctx.preview ? null : controlBar(el);
  const initialRows = rows();
  const grid = swatchGrid<Row>(ctx, 3, initialRows.length);
  const cell = grid.cell;
  const chart = grid.attach(
    createChart(
      el,
      ctx,
      {
        // A bar chart with invisible bars and hidden axes is only the canvas; the custom marks bind to `cells`.
        type: 'bar',
        data: [
          { id: 'cells', values: initialRows },
          { id: 'blank', values: [{ k: 'a', v: 1 }] },
        ],
        dataId: 'blank',
        xField: 'k',
        yField: 'v',
        legends: { visible: false },
        tooltip: { visible: false },
        hover: false,
        select: false,
        axes: [
          { orient: 'left', visible: false },
          { orient: 'bottom', visible: false },
        ],
        bar: { style: { fillOpacity: 0, stroke: false } },
        customMark: ((cell, { preview }) => [
      {
        type: 'rect',
        dataId: 'cells',
        style: {
          x: (d: Row) => cell(d).x0 + 6,
          y: (d: Row) => cell(d).cy - 8,
          width: (d: Row) => cell(d).w - 12,
          height: 16,
          fill: '#ffd93d',
        },
      },
      {
        type: 'rect',
        dataId: 'cells',
        style: {
          x: (d: Row) => cell(d).cx - Math.min(cell(d).w, 160) * 0.35,
          y: (d: Row) => cell(d).cy - cell(d).h * 0.3,
          width: (d: Row) => Math.min(cell(d).w, 160) * 0.7,
          height: (d: Row) => cell(d).h * 0.6,
          fill: '#4d7cff',
          stroke: '#e5534b',
          lineWidth: 8,
          cornerRadius: 6,
          // Only the attribute named by the cell is lowered.
          opacity: (d: Row) => (d.channel === 'opacity' ? d.value : 1),
          fillOpacity: (d: Row) => (d.channel === 'fillOpacity' ? d.value : 1),
          strokeOpacity: (d: Row) => (d.channel === 'strokeOpacity' ? d.value : 1),
        },
      },
      {
        type: 'text',
        dataId: 'cells',
        style: {
          visible: !preview,
          text: (d: Row) => `${d.channel} ${d.channel === d.label ? d.value.toFixed(2) : ''}`,
          x: (d: Row) => cell(d).cx,
          y: (d: Row) => cell(d).y0 + cell(d).h - 12,
          textAlign: 'center',
          fontSize: 12,
          fill: '#8a8f9c',
        },
      },
    ])(cell, { preview: ctx.preview }),
    ...{ animationUpdate: { duration: 400, easing: 'linear' } },
      } as unknown as ISpec,
      { height: 260 },
    ),
    initialRows,
  );
  const set = (v: number): void => {
    state.value = v;
    chart.setRows(rows());
  };
  let t = 0;
  const stop = bar ? (): void => {} : every(500, () => set(0.5 + 0.5 * Math.sin(++t / 2.5)));
  if (bar) slider(bar, 'value', [0, 1, 0.01], state.value, set);
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
