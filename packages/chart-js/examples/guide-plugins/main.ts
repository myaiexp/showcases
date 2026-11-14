// The guide's chartAreaBorder plugin: an inline plugin with its own options
import type { ChartType, Plugin } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { paintingSizes, bubble } from '../../shared/dev-data.ts';
import { C, alpha } from '../../shared/data.ts';

interface BorderOptions {
  borderColor: string;
  borderWidth: number;
  borderDash: number[];
  borderDashOffset: number;
}

// plugins.md § TypeScript Typings: declare the plugin's options so options.plugins accepts them.
declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    chartAreaBorder?: Partial<BorderOptions>;
  }
}

// usage.md § Plugins: an id, and a hook that draws a rectangle around the chart area.
const chartAreaBorder: Plugin<'bubble', BorderOptions> = {
  id: 'chartAreaBorder',
  beforeDraw(chart, _args, options) {
    const {
      ctx,
      chartArea: { left, top, width, height },
    } = chart;
    ctx.save();
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.setLineDash(options.borderDash || []);
    ctx.lineDashOffset = options.borderDashOffset;
    ctx.strokeRect(left, top, width, height);
    ctx.restore();
  },
};

const looks: readonly (readonly [string, BorderOptions])[] = [
  ['red dashed', { borderColor: C.red, borderWidth: 2, borderDash: [5, 5], borderDashOffset: 2 }],
  ['blue solid', { borderColor: C.blue, borderWidth: 3, borderDash: [], borderDashOffset: 0 }],
  ['amber dotted', { borderColor: C.amber, borderWidth: 3, borderDash: [1, 6], borderDashOffset: 0 }],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el);
  stage.box.style.display = 'flex';
  stage.box.style.justifyContent = 'center';

  const chart = new Chart(stage.canvas, {
    type: 'bubble',
    // The plugin goes in this chart's own plugins list, so no other chart gets it.
    plugins: [chartAreaBorder],
    data: {
      datasets: [
        {
          label: 'Paintings by size',
          data: paintingSizes().map(bubble),
          backgroundColor: alpha(C.purple, 0.45),
          borderColor: C.purple,
        },
      ],
    },
    options: {
      aspectRatio: 1,
      scales: { x: { max: 500 }, y: { max: 500 } },
      plugins: { legend: { display: false }, chartAreaBorder: looks[0]![1] },
    },
  });

  const show = (name: string, o: BorderOptions): void => {
    Object.assign(chart.options.plugins!.chartAreaBorder!, o);
    chart.update('none');
    note.textContent = `chartAreaBorder: ${name}`;
  };
  show(...looks[0]!);

  let stop = (): void => {};
  if (bar) {
    const names = looks.map(([n]) => n);
    select(bar, 'Border', names, names[0]!, (n) => show(n, looks.find(([k]) => k === n)![1]));
    slider(bar, 'Width', [1, 8, 1], 2, (v) => {
      chart.options.plugins!.chartAreaBorder!.borderWidth = v;
      chart.update('none');
    });
  } else {
    stop = cycle(looks, 1800, ([n, o]) => show(n, o));
  }

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
