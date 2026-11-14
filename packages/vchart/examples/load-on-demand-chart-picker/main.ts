// VChart.useRegisters with the register function per chart type
import VChart, {
  registerAreaChart,
  registerBarChart,
  registerCartesianBandAxis,
  registerCartesianLinearAxis,
  registerCartesianCrossHair,
  registerDiscreteLegend,
  registerDomTooltipHandler,
  registerLineChart,
  registerPieChart,
  registerRadarChart,
  registerRoseChart,
  registerScatterChart,
  registerTooltip,
} from '@visactor/vchart';
import type { ISpec } from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, readout, select } from '../../shared/chart.ts';
import { pick } from '../../shared/components-data.ts';

interface Entry {
  /** The register function's name, written out because production builds rename functions. */
  label: string;
  chart: () => void;
  spec: ISpec;
}

const cats = ['A', 'B', 'C', 'D', 'E'];
const rows = cats.map((x, i) => ({ x, y: 14 + ((i * 17) % 30) }));
const cartesian = (type: string): ISpec => ({ type, data: [{ id: 'd', values: rows }], xField: 'x', yField: 'y' }) as ISpec;
const polar = (type: string): ISpec => ({ type, data: [{ id: 'd', values: rows }], categoryField: 'x', valueField: 'y' }) as ISpec;

// Charts that draw on a cartesian or polar grid get their axes registered with them (Load_on_Demand.md).
const CHARTS: Record<string, Entry> = {
  bar: { label: 'registerBarChart', chart: registerBarChart, spec: cartesian('bar') },
  line: { label: 'registerLineChart', chart: registerLineChart, spec: cartesian('line') },
  area: { label: 'registerAreaChart', chart: registerAreaChart, spec: cartesian('area') },
  scatter: { label: 'registerScatterChart', chart: registerScatterChart, spec: { type: 'scatter', data: [{ id: 'd', values: rows.map((r, a) => ({ a, y: r.y })) }], xField: 'a', yField: 'y' } as ISpec },
  pie: { label: 'registerPieChart', chart: registerPieChart, spec: polar('pie') },
  rose: { label: 'registerRoseChart', chart: registerRoseChart, spec: { ...polar('rose'), seriesField: 'x' } as ISpec },
  radar: { label: 'registerRadarChart', chart: registerRadarChart, spec: { ...polar('radar'), area: { visible: true } } as ISpec },
};
const NAMES = Object.keys(CHARTS);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const out = bar ? readout(el) : null;
  let current = createChart(el, ctx, (CHARTS.bar as Entry).spec);
  let released = false;

  const show = (name: string): void => {
    if (released) return;
    const entry = CHARTS[name] as Entry;
    // The call a lean bundle would make. The gallery imports the full package, so everything is
    // already registered; this shows the registration, it does not measure bundle size.
    VChart.useRegisters([entry.chart, registerTooltip, registerDomTooltipHandler, registerCartesianCrossHair, registerDiscreteLegend, registerCartesianBandAxis, registerCartesianLinearAxis]);
    current.release();
    current = createChart(el, ctx, entry.spec);
    if (out) {
      out.textContent = `VChart.useRegisters([\n  ${entry.label},\n  registerTooltip, registerDomTooltipHandler,\n  registerCartesianCrossHair, registerDiscreteLegend,\n]);\n\nThe gallery loads the whole package, so this is shown, not measured.`;
    }
  };
  show('bar');

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1500, () => show(pick(NAMES, ++i)));
  } else if (bar) {
    select(bar, 'chart type', NAMES, show);
  }

  return () => {
    released = true;
    stop();
    current.release();
  };
};

export default mount;
