// Bubble size computed from a field in your own data: a scriptable radius
import type { BubbleDataPoint } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { PALETTE, alpha } from '../../shared/data.ts';
import { COUNTRIES } from '../../shared/round-charts-data.ts';

// Points carry their own field (pop) and no r, so the bubble falls back to `radius`.
type Country = BubbleDataPoint & { pop: number; name: string };
const POINTS: Country[] = COUNTRIES.map((c) => ({ x: c.gdp, y: c.life, pop: c.pop, name: c.name, r: undefined }));

const MODES = ['area', 'radius'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);
  const state = { mode: 'area' as Mode, size: ctx.preview ? 3.2 : 6 };

  const chart = new Chart<'bubble', Country[]>(stage.canvas, {
    type: 'bubble',
    data: {
      datasets: [
        {
          label: 'Countries',
          data: POINTS,
          backgroundColor: PALETTE.map((c) => alpha(c, 0.55)),
          borderColor: PALETTE,
          borderWidth: 1.5,
          // Scriptable option: called per bubble with the data point in context.raw.
          // sqrt makes the bubble's AREA proportional to population; without it the
          // radius is, and large countries dwarf everything else.
          radius: (c) => {
            const pop = (c.raw as Country | undefined)?.pop ?? 0;
            return state.mode === 'area' ? Math.sqrt(pop) * state.size * 0.22 : pop * state.size * 0.0058;
          },
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: { type: 'logarithmic', min: 1.5, max: 120, title: { display: !ctx.preview, text: 'GDP per person (k$, log scale)' } },
        y: { min: 45, max: 90, title: { display: !ctx.preview, text: 'Life expectancy (years)' } },
      },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (t) => `${(t.raw as Country).name}: ${(t.raw as Country).pop}M people` } },
      },
    },
  });

  const setMode = (mode: Mode): void => {
    state.mode = mode;
    chart.update();
    label.textContent = mode === 'area' ? 'radius = √population × k' : 'radius = population × k';
  };
  setMode('area');

  if (bar) {
    select(bar, 'Size follows', MODES, state.mode, setMode);
    slider(bar, 'Size factor', [1, 12, 0.5], state.size, (v) => {
      state.size = v;
      chart.update();
    });
  }
  let i = 0;
  const stop = ctx.preview ? every(2400, () => setMode(MODES[++i % MODES.length]!)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
