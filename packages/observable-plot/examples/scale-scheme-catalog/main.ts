// Every named color scheme as a strip, by family
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

type Entry = [string, (t: number) => string];
const sequential: Entry[] = [
  ['Blues', d3.interpolateBlues], ['Greens', d3.interpolateGreens], ['Greys', d3.interpolateGreys],
  ['Purples', d3.interpolatePurples], ['Reds', d3.interpolateReds], ['Oranges', d3.interpolateOranges],
  ['Turbo', d3.interpolateTurbo], ['Viridis', d3.interpolateViridis], ['Magma', d3.interpolateMagma],
  ['Inferno', d3.interpolateInferno], ['Plasma', d3.interpolatePlasma], ['Cividis', d3.interpolateCividis],
  ['Cubehelix', d3.interpolateCubehelixDefault], ['Warm', d3.interpolateWarm], ['Cool', d3.interpolateCool],
  ['BuGn', d3.interpolateBuGn], ['BuPu', d3.interpolateBuPu], ['GnBu', d3.interpolateGnBu],
  ['OrRd', d3.interpolateOrRd], ['PuBuGn', d3.interpolatePuBuGn], ['PuBu', d3.interpolatePuBu],
  ['PuRd', d3.interpolatePuRd], ['RdPu', d3.interpolateRdPu], ['YlGnBu', d3.interpolateYlGnBu],
  ['YlGn', d3.interpolateYlGn], ['YlOrBr', d3.interpolateYlOrBr], ['YlOrRd', d3.interpolateYlOrRd],
];
const diverging: Entry[] = [
  ['BrBG', d3.interpolateBrBG], ['PRGn', d3.interpolatePRGn], ['PiYG', d3.interpolatePiYG],
  ['PuOr', d3.interpolatePuOr], ['RdBu', d3.interpolateRdBu], ['RdGy', d3.interpolateRdGy],
  ['RdYlBu', d3.interpolateRdYlBu], ['RdYlGn', d3.interpolateRdYlGn], ['Spectral', d3.interpolateSpectral],
  ['BuRd', (t) => d3.interpolateRdBu(1 - t)], ['BuYlRd', (t) => d3.interpolateRdYlBu(1 - t)],
];
const cyclical: Entry[] = [['rainbow', d3.interpolateRainbow], ['sinebow', d3.interpolateSinebow]];
const categorical: [string, readonly string[]][] = [
  ['Accent', d3.schemeAccent], ['Category10', d3.schemeCategory10], ['Dark2', d3.schemeDark2],
  ['Observable10', Plot.scale({ color: { type: 'categorical' } }).range as string[]],
  ['Paired', d3.schemePaired], ['Pastel1', d3.schemePastel1], ['Pastel2', d3.schemePastel2],
  ['Set1', d3.schemeSet1], ['Set2', d3.schemeSet2], ['Set3', d3.schemeSet3], ['Tableau10', d3.schemeTableau10],
];

const families = ['sequential', 'diverging', 'cyclical', 'categorical'] as const;
type Family = (typeof families)[number];

// Each cell's fill is a finished CSS color, so the color scale is the identity scale.
function cells(family: Family): [number, string, string][] {
  if (family === 'categorical') return categorical.flatMap(([name, scheme]) => scheme.map((s, i): [number, string, string] => [i, name, s]));
  const rows = family === 'sequential' ? sequential : family === 'diverging' ? diverging : cyclical;
  return rows.flatMap(([name, interpolate]) => d3.ticks(0, 1, family === 'sequential' ? 20 : 30).map((t): [number, string, string] => [t, name, String(interpolate(t))]));
}
const rowCount = { sequential: 27, diverging: 11, cyclical: 2, categorical: 11 };

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { family: 'sequential' as Family },
    render: ({ family }, { width, height, preview }) =>
      Plot.plot({
        width,
        height: height ?? 25 * rowCount[family] + 10,
        margin: 0,
        marginRight: preview ? 0 : 70,
        padding: 0,
        x: { axis: null },
        y: { axis: preview ? null : 'right', tickSize: 0 },
        color: { type: 'identity' },
        marks: [Plot.cell(cells(family), { fill: '2', ...(family === 'categorical' ? { inset: 0.5 } : { insetTop: 0.5, insetBottom: 0.5 }) })],
      }),
    step: (_s, i) => ({ family: families[i % 4] }),
    previewMs: 2200,
    controls: (bar, live) => select(bar, 'family ', families, live.state.family, (family) => live.set({ family })),
  });

export default mount;
