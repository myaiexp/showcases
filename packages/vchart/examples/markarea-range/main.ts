// markArea ranges: x / x1 bands, y / y1 bands and a rectangle from coordinates
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { groupedRows } from '../../shared/components-data.ts';

const CATS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const rows = groupedRows(CATS, ['Visitors'], 24);
const MODES = ['x band', 'y band', 'both', 'coordinates'] as const;
type Mode = (typeof MODES)[number];

const labelOf = (text: string, color: string) => ({ position: 'insideTop' as const, text, style: { fill: color, fontWeight: 'bold' as const } });

const build = (mode: Mode): ISpec => {
  const xBand = { x: 'Wed', x1: 'Fri', area: { style: { fill: '#38bdf8', fillOpacity: 0.18 } }, label: labelOf('midweek', '#38bdf8') };
  const yBand = { y: 70, y1: 100, area: { style: { fill: '#f87171', fillOpacity: 0.18 } }, label: { position: 'insideTopRight' as const, text: 'danger zone', style: { fill: '#f87171', fontWeight: 'bold' as const } } };
  // coordinates are the corners of the area, each given by data values.
  const box = {
    coordinates: [
      { x: 'Sat', y: 20 },
      { x: 'Sun', y: 20 },
      { x: 'Sun', y: 60 },
      { x: 'Sat', y: 60 },
    ],
    area: { style: { fill: '#a3e635', fillOpacity: 0.2, stroke: '#a3e635', lineWidth: 1 } },
    label: { position: 'middle' as const, text: 'weekend', style: { fill: '#a3e635' } },
  };
  const markArea = mode === 'x band' ? [xBand] : mode === 'y band' ? [yBand] : mode === 'both' ? [xBand, yBand] : [box];
  return {
    type: 'bar',
    data: [{ id: 'bars', values: rows }],
    xField: 'x',
    yField: 'y',
    bar: { style: { fill: '#94a3b8', fillOpacity: 0.7 } },
    axes: [{ orient: 'left', max: 100 }, { orient: 'bottom' }],
    markArea,
  };
};

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build('x band'));
  let released = false;

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1700, () => {
      i += 1;
      if (!released) void vchart.updateSpec(build(MODES[i % MODES.length] as Mode));
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'markArea', MODES, (v) => {
      if (!released) void vchart.updateSpec(build(v as Mode));
    });
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
