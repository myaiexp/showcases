// A plugin that paints a colour behind the chart, then exports it as a PNG
import type { ChartOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { button, controlBar, select, toggle } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';

// Options of our own plugin live under options.plugins.<id>; the type does not know it.
type Plugins = NonNullable<ChartOptions<'line'>['plugins']> & { showcaseCanvasBackground?: { color?: string } };

const COLOURS = ['#1e3a5f', '#4a1d3d', '#14532d', '#44403c'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180, height: 300 });
  const label = caption(el);
  let colour = COLOURS[0]!;
  let on = true;

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: MONTHS.slice(0, 8),
      datasets: [{ label: 'Visitors (k)', data: [12, 15, 14, 19, 24, 31, 38, 35], borderColor: C.amber, backgroundColor: alpha(C.amber, 0.4), tension: 0.35, fill: true }],
    },
    options: {
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, showcaseCanvasBackground: { color: colour } } as Plugins,
    },
    plugins: [
      {
        // canvas-background.md: there is no built-in option, so a plugin fills the
        // canvas. 'destination-over' paints behind what is already drawn.
        id: 'showcaseCanvasBackground',
        beforeDraw(c, _args, options: { color?: string }) {
          if (!options.color) return;
          const { ctx: g } = c;
          g.save();
          g.globalCompositeOperation = 'destination-over';
          g.fillStyle = options.color;
          g.fillRect(0, 0, c.width, c.height);
          g.restore();
        },
      },
    ],
  });

  const apply = (): void => {
    (chart.options.plugins as Plugins).showcaseCanvasBackground = { color: on ? colour : undefined };
    chart.update();
    label.textContent = on ? `color: '${colour}'` : 'no background plugin';
  };
  apply();

  if (bar) {
    // The export, shown on white: a transparent canvas leaves grey text on nothing.
    const out = document.createElement('div');
    out.style.cssText = 'display:flex;gap:12px;align-items:center;margin-top:10px;width:100%';
    const img = document.createElement('img');
    img.alt = 'The exported chart image';
    img.style.cssText = 'width:240px;height:auto;background:#fff;border:1px solid var(--fg-3);display:none';
    const info = document.createElement('span');
    info.style.cssText = 'font:12px ui-monospace,monospace;color:var(--fg-2)';
    out.append(img, info);
    el.append(out);

    toggle(bar, 'background plugin on', on, (v) => ((on = v), apply()));
    select(bar, 'colour', COLOURS, colour, (v) => ((colour = v), apply()));
    button(bar, 'Export image', () => {
      const url = chart.toBase64Image(); // api.md: a PNG data URL of the canvas as it is now
      img.src = url;
      img.style.display = 'block';
      info.textContent = `toBase64Image() → ${Math.round(url.length / 1024)} KB PNG, shown on white`;
    });
  }
  const stop = ctx.preview ? cycle(COLOURS, 1800, (c) => ((colour = c), apply())) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
