// Legend item styling: shape, label and background, each with an unSelected state
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { groupedRows, GROUPS, pick } from '../../shared/components-data.ts';

const SYMBOLS = ['circle', 'square', 'diamond', 'triangle', 'star'] as const;

const build = (symbol: string, background: boolean): ISpec => ({
  type: 'bar',
  data: [{ id: 'sales', values: groupedRows(['Q1', 'Q2', 'Q3', 'Q4'], GROUPS, 9) }],
  xField: ['x', 'c'],
  yField: 'y',
  seriesField: 'c',
  legends: {
    visible: true,
    orient: 'top',
    title: { visible: true, text: 'Region' },
    item: {
      spaceCol: 14,
      // Each part takes `style` for the normal state and `state` for selected / unSelected / *Hover.
      shape: {
        space: 8,
        style: { symbolType: symbol, size: 12 },
        state: { unSelected: { fill: '#6b7280', fillOpacity: 0.5 } },
      },
      label: {
        style: { fontSize: 13, fontWeight: 'bold' },
        state: { unSelected: { fill: '#6b7280', fillOpacity: 0.6 } },
      },
      background: {
        visible: background,
        style: { fill: 'rgba(255,255,255,0.08)', cornerRadius: 10 },
        state: {
          selectedHover: { fill: 'rgba(255,255,255,0.22)' },
          unSelectedHover: { fill: 'rgba(255,255,255,0.12)' },
        },
      },
    },
  },
});

const mount: Mount = (el, ctx) => {
  let symbol = 'square';
  let background = true;
  const { vchart, release } = createChart(el, ctx, build(symbol, background));
  let released = false;
  const apply = (): void => {
    if (!released) void vchart.updateSpec(build(symbol, background));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    // Un-check and re-check items so the unSelected styles show.
    let i = 0;
    stop = every(1300, () => {
      i += 1;
      const off = pick(GROUPS, i);
      vchart.setLegendSelectedDataByIndex(0, i % 5 === 0 ? [...GROUPS] : GROUPS.filter((g) => g !== off));
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'shape symbolType', SYMBOLS, (v) => ((symbol = v), apply())).value = symbol;
    select(bar, 'item background', ['visible', 'hidden'], (v) => ((background = v === 'visible'), apply()));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
