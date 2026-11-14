// A custom series on a calendar: renderItem draws a sized glyph in each day cell
import type { CustomSeriesRenderItem } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const KINDS = ['run', 'swim', 'ride'] as const;
const COLORS: Record<(typeof KINDS)[number], string> = { run: '#5b8ff9', swim: '#5ad8a6', ride: '#f6bd16' };
type Glyph = 'circle' | 'diamond' | 'ring' | 'bar';

/** One entry per day of Aug to Oct 2026: [date, minutes], coloured by the activity. */
function days(): { value: [string, number]; itemStyle: { color: string } }[] {
  const out = [];
  for (let t = Date.UTC(2026, 7, 1); t <= Date.UTC(2026, 9, 31); t += 86400000) {
    if (Math.random() < 0.35) continue; // rest day
    const kind = KINDS[Math.floor(Math.random() * KINDS.length)]!;
    out.push({ value: [new Date(t).toISOString().slice(0, 10), Math.round(10 + Math.random() * 80)] as [string, number], itemStyle: { color: COLORS[kind] } });
  }
  return out;
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 340 });
  let data = days();
  let glyph: Glyph = 'circle';

  /**
   * Called per day: api.coord on a calendar returns the centre of the date's cell, and
   * params.coordSys carries cellWidth and cellHeight. The glyph's size follows the minutes.
   */
  const renderItem: CustomSeriesRenderItem = (params, api) => {
    const sys = params.coordSys as unknown as { cellWidth: number; cellHeight: number };
    const [cx, cy] = api.coord(api.value(0)) as [number, number];
    const room = Math.min(sys.cellWidth, sys.cellHeight) - 2;
    const size = (room * (api.value(1) as number)) / 90;
    const color = api.visual('color') as string;
    switch (glyph) {
      case 'diamond':
        return { type: 'polygon', shape: { points: [[cx, cy - size / 2], [cx + size / 2, cy], [cx, cy + size / 2], [cx - size / 2, cy]] }, style: { fill: color } };
      case 'ring':
        return { type: 'circle', shape: { cx, cy, r: size / 2 }, style: { fill: 'none', stroke: color, lineWidth: 2 } };
      case 'bar':
        // A bar standing on the bottom edge of the cell.
        return { type: 'rect', shape: { x: cx - room / 4, y: cy + room / 2 - size, width: room / 2, height: size }, style: { fill: color } };
      default:
        return { type: 'circle', shape: { cx, cy, r: size / 2 }, style: { fill: color } };
    }
  };

  const show = (): void => {
    chart.setOption({
      tooltip: { show: !ctx.preview },
      calendar: {
        range: ['2026-08-01', '2026-10-31'],
        top: ctx.preview ? 24 : 50,
        left: 36,
        right: 16,
        cellSize: ['auto', ctx.preview ? 18 : 30],
        dayLabel: { firstDay: 1 },
        monthLabel: { show: true },
        yearLabel: { show: false },
      },
      series: [
        {
          type: 'custom',
          coordinateSystem: 'calendar',
          renderItem,
          // Dimension 0 is the date; the calendar maps it to a cell.
          encode: { time: 0, tooltip: [0, 1] },
          dimensions: ['date', 'minutes'],
          data,
        },
      ],
    });
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const order: Glyph[] = ['circle', 'diamond', 'ring', 'bar'];
    let i = 0;
    stop = every(1800, () => {
      glyph = order[++i % order.length]!;
      data = days();
      show();
    });
  } else {
    select(bar!, 'glyph', ['circle', 'diamond', 'ring', 'bar'], (v) => {
      glyph = v as Glyph;
      show();
    });
    select(bar!, 'data', ['keep', 'new data'], (v) => {
      if (v === 'new data') data = days();
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
