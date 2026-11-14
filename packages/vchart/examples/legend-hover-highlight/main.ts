// Custom legend interaction: select off, legendItemHover events driving updateState
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { groupedRows, pick } from '../../shared/components-data.ts';

const TYPES = ['Forest', 'Steppe', 'Desert', 'Wetland'];

const spec = {
  type: 'bar',
  data: [{ id: 'land', values: groupedRows(['2012', '2013', '2014', '2015'], TYPES, 31).map((d) => ({ year: d.x, type: d.c, value: d.y })) }],
  xField: ['year', 'type'],
  yField: 'value',
  seriesField: 'type',
  // A named state; updateState later decides which datums are in it.
  stateDef: { legend_hover: { filter: () => true } },
  legends: [
    {
      orient: 'top',
      select: false, // the click-to-filter interaction is turned off
      item: { shape: { space: 8 }, background: { visible: false } },
    },
  ],
  bar: { state: { legend_hover_reverse: { fill: '#4b5563' } } },
} as ISpec; // stateDef is documented (Legend.md) but missing from the ISpec types

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, spec);
  let released = false;
  const dim = (type: string | null): void => {
    if (released) return;
    // Everything except the hovered type goes grey; filter false for all clears it.
    vchart.updateState({ legend_hover_reverse: { filter: (d) => type !== null && d.type !== type } });
  };

  vchart.on('legendItemHover', (e) => dim(((e as { value?: { data?: { label?: string } } }).value?.data?.label) ?? null));
  vchart.on('legendItemUnHover', () => dim(null));

  let stop = (): void => {};
  if (ctx.preview) {
    // No pointer: walk the same highlight across the four types.
    let i = 0;
    stop = every(1200, () => {
      i += 1;
      dim(i % 5 === 4 ? null : pick(TYPES, i));
    });
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
