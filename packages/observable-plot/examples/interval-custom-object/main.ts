// An interval is any object with floor, offset and range: here, every n years
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { hadcrut } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

// A custom interval: bins n units wide, counted from an origin. floor and offset are the
// minimum the docs ask for; range and ceil are what the bin transform also reads.
function every(n: number, origin: number): Plot.NiceIntervalImplementation<number> {
  const floor = (v: number): number => origin + Math.floor((v - origin) / n) * n;
  const offset = (v: number, k = 1): number => v + k * n;
  return {
    floor,
    offset,
    ceil: (v) => (floor(v) === v ? v : offset(floor(v))),
    range(a, b) {
      const out: number[] = [];
      for (let v = Math.ceil((a - origin) / n) * n + origin; v < b; v += n) out.push(v);
      return out;
    },
  };
}

const CHOICES: Record<string, Plot.NiceIntervalImplementation<number>> = {
  'every(8, 1850)': every(8, 1850),
  'every(20, 1850)': every(20, 1850),
  'every(25, 1900)': every(25, 1900),
  'every(50, 1850)': every(50, 1850),
};
const NAMES = Object.keys(CHOICES);

const mount: Mount = async (el, ctx) => {
  const data = await hadcrut();
  return mountPlot<{ name: string }>(el, ctx, {
    initial: { name: 'every(20, 1850)' },
    render: ({ name }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? `interval: ${name}` : undefined,
        x: { tickFormat: 'd' },
        y: { grid: true, label: 'Mean anomaly (°C)' },
        color: { type: 'diverging', scheme: 'RdBu', reverse: true },
        marks: [
          Plot.rectY(data, Plot.binX<Plot.RectYOptions>({ y: 'mean', fill: 'mean' }, { x: 'year', y: 'anomaly', fill: 'anomaly', interval: CHOICES[name], insetLeft: 0.5, insetRight: 0.5 })),
          Plot.ruleY([0]),
        ],
      }),
    step: (_s, i) => ({ name: NAMES[i % NAMES.length] }),
    previewMs: 1700,
    controls: (bar, live) => {
      select(bar, 'interval', NAMES, live.state.name, (name) => live.set({ name }));
    },
  });
};

export default mount;
