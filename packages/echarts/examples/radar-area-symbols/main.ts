// Radar series styling: areaStyle, symbol, symbolSize, point labels, lineStyle and emphasis focus
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const indicator = ['Speed', 'Power', 'Range', 'Armour', 'Cost', 'Stealth'].map((name) => ({ name, max: 10 }));
const fleets = [
  { name: 'Scout', value: [9, 3, 7, 2, 4, 8] },
  { name: 'Frigate', value: [6, 6, 6, 6, 6, 5] },
  { name: 'Dreadnought', value: [2, 10, 5, 9, 9, 1] },
];
const SYMBOLS = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let symbol = 'circle';
  let symbolSize = 8;
  let opacity = 0.3;
  let labels = false;
  let dashed = false;
  let focus = true;

  const show = (): void => {
    chart.setOption({
      legend: { show: !ctx.preview },
      tooltip: {},
      radar: { indicator, radius: ctx.preview ? '62%' : '66%', axisName: { fontSize: ctx.preview ? 10 : 13 } },
      series: [
        {
          type: 'radar',
          // symbol / symbolSize: the marker on each vertex.
          symbol,
          symbolSize,
          // areaStyle fills the polygon; opacity keeps the others visible underneath.
          areaStyle: { opacity },
          lineStyle: { width: 2, type: dashed ? 'dashed' : 'solid' },
          // label shows each vertex value; the series-level label applies to every data item.
          label: { show: labels, formatter: (p: { value?: unknown }) => String(p.value), fontSize: 11 },
          // emphasis.focus 'series' fades the other polygons while one is hovered.
          emphasis: { focus: focus ? 'series' : 'none', lineStyle: { width: 4 } },
          data: fleets,
        },
      ],
    });
  };
  show();

  // Preview: cycle the symbol and the fill, since there is no pointer to hover.
  let n = 0;
  const stop = ctx.preview
    ? every(1500, () => {
        n++;
        symbol = SYMBOLS[n % 7]!;
        symbolSize = 6 + (n % 3) * 4;
        opacity = [0.1, 0.3, 0.55][n % 3]!;
        labels = n % 4 === 3;
        show();
      })
    : () => {};
  if (bar) {
    select(bar, 'symbol', SYMBOLS, (v) => {
      symbol = v;
      show();
    });
    slider(bar, 'symbolSize', [2, 24, 1], symbolSize, (v) => {
      symbolSize = v;
      show();
    });
    slider(bar, 'areaStyle.opacity', [0, 1, 0.05], opacity, (v) => {
      opacity = v;
      show();
    });
    const lb = button(bar, 'label: off', () => {
      labels = !labels;
      lb.textContent = `label: ${labels ? 'on' : 'off'}`;
      show();
    });
    const ls = button(bar, 'lineStyle.type: solid', () => {
      dashed = !dashed;
      ls.textContent = `lineStyle.type: ${dashed ? 'dashed' : 'solid'}`;
      show();
    });
    const fo = button(bar, 'emphasis.focus: series', () => {
      focus = !focus;
      fo.textContent = `emphasis.focus: ${focus ? 'series' : 'none'}`;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
