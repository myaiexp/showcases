// A homemade axis type: a square-root scale
import { Scale, Ticks } from 'chart.js';
import type { CartesianScaleOptions, Tick } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

// axes.md: the id goes into CartesianScaleTypeRegistry (ScaleTypeRegistry extends it) so TypeScript accepts `type: 'showcase-sqrt'`.
declare module 'chart.js' {
  interface CartesianScaleTypeRegistry {
    'showcase-sqrt': { options: CartesianScaleOptions };
  }
}

// axes.md § Scale Interface: determine the data limits, build ticks, and map a value to a
// pixel and back. Everything else (layout, labels, grid, titles) comes from Scale.
class SqrtScale extends Scale {
  static id = 'showcase-sqrt';
  static defaults = { ticks: { callback: Ticks.formatters.numeric } };

  override determineDataLimits(): void {
    const { max } = this.getMinMax(true);
    this.min = 0;
    this.max = Number.isFinite(max) && max > 0 ? max : 1;
  }

  override buildTicks(): Tick[] {
    // Ticks at 0, s², (2s)², (3s)² …: evenly spaced on screen because the scale is a root.
    const root = Math.sqrt(this.max);
    const step = [1, 2, 4, 5, 10, 20, 25, 50].find((s) => Math.ceil(root / s) <= 6) ?? 50;
    const count = Math.ceil(root / step);
    this.max = (count * step) ** 2;
    return Array.from({ length: count + 1 }, (_, i) => ({ value: (i * step) ** 2 }));
  }

  override getLabelForValue(value: number): string {
    return String(value);
  }

  override getPixelForValue(value: number): number {
    return this.getPixelForDecimal(Math.sqrt(Math.max(0, value)) / Math.sqrt(this.max));
  }

  override getValueForPixel(pixel: number): number {
    return (this.getDecimalForPixel(pixel) * Math.sqrt(this.max)) ** 2;
  }
}
// Registered once at module level; the id is the one used in `type`.
Chart.register(SqrtScale);

const TOWNS = [
  ['Helsinki', 658],
  ['Espoo', 313],
  ['Tampere', 249],
  ['Vantaa', 245],
  ['Oulu', 214],
  ['Turku', 197],
  ['Lahti', 120],
  ['Rovaniemi', 64],
  ['Kemi', 21],
] as const;

type Kind = 'linear' | 'showcase-sqrt';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: TOWNS.map((t) => t[0]),
      datasets: [{ label: 'Population (thousands)', data: TOWNS.map((t) => t[1]), backgroundColor: alpha(C.cyan, 0.65), borderRadius: 2 }],
    },
    options: {
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: { x: { type: 'showcase-sqrt' }, y: { ticks: { font: { size: ctx.preview ? 9 : 12 } } } },
      plugins: { legend: { display: false } },
    },
  });

  // Swapping an axis type means replacing the whole scale object (updates.md).
  const use = (kind: Kind): void => {
    chart.options.scales!.x = { type: kind } as never;
    chart.update();
    note.textContent = `scales.x.type: '${kind}'`;
  };
  use('showcase-sqrt');

  if (bar) select(bar, 'Axis type', ['showcase-sqrt', 'linear'] as const, 'showcase-sqrt', use);
  const stop = ctx.preview ? cycle<Kind>(['showcase-sqrt', 'linear'], 2600, use) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
