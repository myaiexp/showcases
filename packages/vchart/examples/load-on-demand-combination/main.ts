// Registers a combination chart needs: common chart plus series
import VChart, {
  registerBarSeries,
  registerCartesianBandAxis,
  registerCartesianLinearAxis,
  registerCommonChart,
  registerLineSeries,
  registerScatterSeries,
  registerAreaSeries,
} from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, readout, select } from '../../shared/chart.ts';
import { pick } from '../../shared/components-data.ts';

const cats = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'];
const bars = cats.map((x, i) => ({ x, v: 20 + ((i * 13) % 30) }));
const trend = cats.map((x, i) => ({ x, v: 30 + i * 6 }));

const COMBOS: Record<string, { regs: (() => void)[]; names: string; types: string[] }> = {
  'bar + line': { regs: [registerBarSeries, registerLineSeries], names: 'registerBarSeries, registerLineSeries', types: ['bar', 'line'] },
  'area + line': { regs: [registerAreaSeries, registerLineSeries], names: 'registerAreaSeries, registerLineSeries', types: ['area', 'line'] },
  'bar + scatter': { regs: [registerBarSeries, registerScatterSeries], names: 'registerBarSeries, registerScatterSeries', types: ['bar', 'scatter'] },
};
const NAMES = Object.keys(COMBOS);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const out = bar ? readout(el) : null;
  let current: ReturnType<typeof createChart> | undefined;
  let released = false;

  const show = (name: string): void => {
    if (released) return;
    const combo = COMBOS[name];
    if (!combo) return;
    // The common chart, the series it draws and the two axes: the list the guide gives for a combination chart.
    VChart.useRegisters([registerCommonChart, ...combo.regs, registerCartesianBandAxis, registerCartesianLinearAxis]);
    current?.release();
    const [a, b] = combo.types as [string, string];
    current = createChart(el, ctx, {
      type: 'common',
      data: [
        { id: 'first', values: bars },
        { id: 'second', values: trend },
      ],
      series: [
        { type: a, dataId: 'first', xField: 'x', yField: 'v' },
        { type: b, dataId: 'second', xField: 'x', yField: 'v' },
      ],
      axes: [
        { orient: 'bottom', type: 'band' },
        { orient: 'left', type: 'linear' },
      ],
    } as never);
    if (out) out.textContent = `VChart.useRegisters([\n  registerCommonChart,\n  ${combo.names},\n  registerCartesianBandAxis, registerCartesianLinearAxis,\n]);\n\nAll of it is already registered by the full import: registration is shown here, not measured.`;
  };
  show('bar + line');

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1700, () => show(pick(NAMES, ++i)));
  } else if (bar) {
    select(bar, 'combination', NAMES, show);
  }

  return () => {
    released = true;
    stop();
    current?.release();
  };
};

export default mount;
