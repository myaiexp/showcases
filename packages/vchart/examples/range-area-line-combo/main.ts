// Range area plus a line: type common with two series on two data entries
import type { Mount } from '@/types.ts';
import type { ISpec, IVChart } from '@visactor/vchart';
import { seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(83);
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
const build = (): { band: Record<string, unknown>[]; mid: Record<string, unknown>[] } => {
  const mids = MONTHS.map((_, i) => 12 + Math.sin((i / 10) * Math.PI * 2) * 10 + (rand() - 0.5) * 4);
  return {
    band: MONTHS.map((x, i) => ({ x, min: Math.round((mids[i] ?? 0) - 5 - rand() * 3), max: Math.round((mids[i] ?? 0) + 5 + rand() * 3) })),
    mid: MONTHS.map((x, i) => ({ x, value: Math.round(mids[i] ?? 0) })),
  };
};
let last = build();

const mount: Mount = (el, ctx) => {
  let alive = true;
  let vchart: IVChart | undefined;
  const cleanup = mountData(el, ctx, {
    // Both data entries change together: the band is returned, the line is pushed here.
    next: () => {
      last = build();
      if (alive) void vchart?.updateData('mid', last.mid);
      return last.band;
    },
    spec: {
      type: 'common',
      data: [
        { id: 'data', values: last.band },
        { id: 'mid', values: last.mid },
      ],
      series: [
        { type: 'rangeArea', dataIndex: 0, xField: 'x', yField: ['min', 'max'], area: { style: { fillOpacity: 0.45 } } },
        {
          type: 'line',
          dataIndex: 1,
          xField: 'x',
          yField: 'value',
          point: { state: { hover: { scaleX: 1.5, scaleY: 1.5 }, selected: { stroke: '#fff', lineWidth: 2 } } },
        },
      ],
      axes: [
        { orient: 'left', seriesIndex: [0, 1] },
        { orient: 'bottom', seriesIndex: [0, 1] },
      ],
      crosshair: { xField: { visible: true } },
    } as ISpec,
    setup: (chart) => {
      vchart = chart.vchart;
    },
  });
  return () => {
    alive = false;
    cleanup();
  };
};

export default mount;
