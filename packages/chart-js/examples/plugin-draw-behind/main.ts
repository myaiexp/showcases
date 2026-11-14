// A target band drawn before the grid, before the data, or on top of it
import type { ChartType, Plugin } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

type Layer = 'beforeDraw' | 'beforeDatasetsDraw' | 'afterDatasetsDraw';
const LAYERS: readonly Layer[] = ['beforeDraw', 'beforeDatasetsDraw', 'afterDatasetsDraw'];

interface BandOptions {
  layer: Layer;
  from: number;
  to: number;
  color: string;
}

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    showcaseTargetBand?: Partial<BandOptions>;
  }
}

// plugins.md § Plugin Core API, Rendering: the same drawing code hung on three hooks.
// Only the hook named in options.layer paints, so the reader can compare them.
const paint =
  (layer: Layer) =>
  (chart: Chart<'line'>, _args: unknown, options: BandOptions): void => {
    if (options.layer !== layer) return;
    const { ctx, chartArea, scales } = chart;
    const top = scales.y!.getPixelForValue(options.to);
    const bottom = scales.y!.getPixelForValue(options.from);
    ctx.save();
    ctx.fillStyle = options.color;
    ctx.fillRect(chartArea.left, top, chartArea.width, bottom - top);
    ctx.restore();
  };

const targetBand: Plugin<'line', BandOptions> = {
  id: 'showcaseTargetBand',
  defaults: { layer: 'beforeDatasetsDraw', from: 20, to: 24, color: alpha(C.green, 0.55) },
  beforeDraw: paint('beforeDraw'),
  beforeDatasetsDraw: paint('beforeDatasetsDraw'),
  afterDatasetsDraw: paint('afterDatasetsDraw'),
};

const HOURLY = [17, 16.5, 16, 15.5, 15.5, 16, 17.5, 19, 20.5, 21.5, 22.5, 23.5, 24.5, 25, 24.5, 23.5, 22.5, 22, 21.5, 20.5, 19.5, 18.5, 18, 17.5];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'line',
    plugins: [targetBand],
    data: {
      labels: HOURLY.map((_, h) => `${String(h).padStart(2, '0')}:00`),
      datasets: [
        {
          label: 'Living room (°C)',
          data: HOURLY,
          borderColor: C.amber,
          backgroundColor: alpha(C.amber, 0.3),
          borderWidth: 5,
          pointRadius: 0,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { min: 12, max: 28 }, x: { ticks: { maxTicksLimit: 6 } } },
      plugins: { legend: { display: false }, showcaseTargetBand: {} },
    },
  });

  const opts = (): Partial<BandOptions> => chart.options.plugins!.showcaseTargetBand!;
  const setLayer = (layer: Layer): void => {
    opts().layer = layer;
    chart.update('none');
    note.textContent = `drawn in ${layer}`;
  };
  setLayer('beforeDatasetsDraw');

  if (bar) {
    select(bar, 'Hook', LAYERS, 'beforeDatasetsDraw', setLayer);
    slider(bar, 'Band from °C', [14, 26, 1], 20, (v) => ((opts().from = v), chart.update('none')));
    slider(bar, 'Band to °C', [14, 28, 1], 24, (v) => ((opts().to = v), chart.update('none')));
  }
  const stop = ctx.preview ? cycle(LAYERS, 2000, setLayer) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
