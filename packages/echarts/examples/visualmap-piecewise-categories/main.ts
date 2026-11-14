// visualMap piecewise with categories: table mapping from a text dimension to colour and symbol
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';
import { seeded } from '../../shared/interaction-data.ts';

const KINDS = ['Fire', 'Water', 'Earth', 'Air'];
const rand = seeded(31);
// Each row is [x, y, kind]: the third value is text, not a number.
const data = Array.from({ length: 80 }, (_, i) => {
  const kind = KINDS[i % 4]!;
  const cx = [25, 70, 30, 72][i % 4]!;
  const cy = [70, 72, 28, 30][i % 4]!;
  return [Math.round(cx + (rand() - 0.5) * 36), Math.round(cy + (rand() - 0.5) * 36), kind];
});

interface Look { selectedMode: string; orient: string; itemSymbol: string; inverse: boolean; symbols: boolean }

function build(look: Look, preview: boolean): EChartsOption {
  return {
    tooltip: {},
    grid: { top: 16, left: 40, right: look.orient === 'vertical' ? 110 : 20, bottom: look.orient === 'vertical' ? 30 : 60 },
    xAxis: { type: 'value', min: 0, max: 100 },
    yAxis: { type: 'value', min: 0, max: 100 },
    visualMap: {
      type: 'piecewise',
      // dimension 2 is the text column; categories lists the values that get an entry, in order.
      dimension: 2,
      categories: KINDS,
      // Table mapping: an array with one visual value per category (an object keyed by value also works).
      inRange: look.symbols
        ? { color: ['#ee6666', '#5470c6', '#91cc75', '#fac858'], symbol: ['triangle', 'circle', 'rect', 'diamond'] }
        : { color: ['#ee6666', '#5470c6', '#91cc75', '#fac858'] },
      // selectedMode: 'multiple' toggles each entry, 'single' keeps one, false disables clicking.
      selectedMode: look.selectedMode === 'false' ? false : (look.selectedMode as 'multiple'),
      orient: look.orient as 'vertical',
      itemSymbol: look.itemSymbol,
      // inverse: reverse the order of the entries.
      inverse: look.inverse,
      right: look.orient === 'vertical' ? 8 : 'center',
      top: look.orient === 'vertical' ? 'center' : undefined,
      bottom: look.orient === 'vertical' ? undefined : 4,
      itemGap: preview ? 6 : 10,
      textStyle: { color: '#ccc' },
    },
    series: [{ type: 'scatter', symbolSize: preview ? 9 : 14, data }],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look: Look = { selectedMode: 'multiple', orient: 'vertical', itemSymbol: 'roundRect', inverse: false, symbols: true };
  const show = (): void => {
    chart.setOption(build(look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'selectedMode', ['multiple', 'single', 'false'], (v) => {
      look.selectedMode = v;
      show();
    });
    select(bar, 'orient', ['vertical', 'horizontal'], (v) => {
      look.orient = v;
      show();
    });
    select(bar, 'itemSymbol', ['roundRect', 'circle', 'rect', 'diamond'], (v) => {
      look.itemSymbol = v;
      show();
    });
    const inv = button(bar, 'inverse: off', () => {
      look.inverse = !look.inverse;
      inv.textContent = 'inverse: ' + (look.inverse ? 'on' : 'off');
      show();
    });
    const sym = button(bar, 'symbol mapping: on', () => {
      look.symbols = !look.symbols;
      sym.textContent = 'symbol mapping: ' + (look.symbols ? 'on' : 'off');
      show();
    });
  } else {
    // selectDataRange with an object: key is the category, value true/false.
    let i = 0;
    stop = every(1200, () => {
      const hidden = KINDS[i % KINDS.length]!;
      chart.dispatchAction({ type: 'selectDataRange', selected: Object.fromEntries(KINDS.map((k) => [k, k !== hidden])) });
      i++;
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
