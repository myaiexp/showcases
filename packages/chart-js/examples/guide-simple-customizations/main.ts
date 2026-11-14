// Animation, legend and tooltip switched off, as in the guide
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, toggle } from '../../shared/controls.ts';
import { autoHover } from '../../shared/hover.ts';
import { acquisitionsByYear } from '../../shared/dev-data.ts';
import { C, alpha, seeded } from '../../shared/data.ts';

interface Switches {
  animation: boolean;
  legend: boolean;
  tooltip: boolean;
}

// The card walks from the default chart to the tidied one.
const STEPS: readonly Switches[] = [
  { animation: true, legend: true, tooltip: true },
  { animation: false, legend: true, tooltip: true },
  { animation: false, legend: false, tooltip: true },
  { animation: false, legend: false, tooltip: false },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el);
  const rand = seeded(2);
  // The guide's first seven years, so the bars stay wide enough to read.
  const data = acquisitionsByYear().slice(0, 7);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: 'Acquisitions by year',
          data: data.map((row) => row.count),
          backgroundColor: alpha(C.blue, 0.6),
          borderColor: C.blue,
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      // usage.md § Simple customizations: three options, three booleans.
      animation: { duration: 800 },
      plugins: { legend: { display: true }, tooltip: { enabled: true } },
    },
  });

  const apply = ({ animation, legend, tooltip }: Switches): void => {
    chart.options.animation = animation ? { duration: 800 } : false;
    chart.options.plugins!.legend!.display = legend;
    chart.options.plugins!.tooltip!.enabled = tooltip;
    note.textContent = `anim ${animation ? 'on' : 'off'} · legend ${legend ? 'on' : 'off'} · tooltip ${tooltip ? 'on' : 'off'}`;
  };
  const state = { ...STEPS[0]! };
  apply(state);

  let stop = (): void => {};
  if (bar) {
    // New figures on each change make the animation switch visible.
    const refresh = (): void => {
      apply(state);
      const values = chart.data.datasets[0]!.data as number[];
      for (let i = 0; i < values.length; i++) values[i] = Math.round(40 + rand() * 90);
      chart.update();
    };
    toggle(bar, 'animation', true, (v) => ((state.animation = v), refresh()));
    toggle(bar, 'legend', true, (v) => ((state.legend = v), refresh()));
    toggle(bar, 'tooltip', true, (v) => ((state.tooltip = v), refresh()));
  } else {
    const hover = autoHover(chart, 1100);
    const walk = cycle(STEPS, 2600, (s) => {
      apply(s);
      const values = chart.data.datasets[0]!.data as number[];
      for (let i = 0; i < values.length; i++) values[i] = Math.round(40 + rand() * 90);
      chart.update();
    });
    stop = (): void => {
      hover();
      walk();
    };
  }

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
