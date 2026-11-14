// Customer survey on a radar: restyle, space and rewrite the edge labels
import type { RadialLinearScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider, toggle } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

interface Labels {
  size: number;
  padding: number;
  short: boolean;
  center: boolean;
}
const STATES: Labels[] = [
  { size: 12, padding: 5, short: false, center: false },
  { size: 16, padding: 5, short: false, center: false },
  { size: 12, padding: 20, short: false, center: false },
  { size: 12, padding: 5, short: true, center: false },
  { size: 12, padding: 5, short: false, center: true },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'radar',
    data: {
      labels: ['Friendly staff', 'Value for money', 'Cleanliness', 'Speed of service', 'Food quality', 'Atmosphere'],
      datasets: [{ label: 'Score', data: [4.6, 3.2, 4.1, 2.8, 4.4, 3.9], fill: true, borderColor: C.pink, backgroundColor: alpha(C.pink, 0.25), pointBackgroundColor: C.pink }],
    },
    options: {
      maintainAspectRatio: false,
      scales: { r: { min: 0, max: 5, ticks: { display: false }, pointLabels: {} } },
      plugins: { legend: { display: false } },
    },
  });
  const r = (): RadialLinearScaleOptions => chart.options.scales!.r as RadialLinearScaleOptions;

  // radial/linear.md § Point Label Options: font, padding, centerPointLabels, callback.
  const apply = (s: Labels): void => {
    r().pointLabels = {
      ...r().pointLabels,
      font: { size: s.size, weight: 'bold' },
      padding: s.padding,
      centerPointLabels: s.center,
      // The callback maps each label to the text drawn: here the first word, in capitals.
      callback: (text) => (s.short ? (text.split(' ')[0] ?? text).toUpperCase() : text),
    };
    chart.update();
    label.textContent = `size ${s.size}, padding ${s.padding}${s.short ? ', callback' : ''}${s.center ? ', centered' : ''}`;
  };
  apply(STATES[0]!);

  if (bar) {
    const now: Labels = { ...STATES[0]! };
    slider(bar, 'font size', [9, 24, 1], now.size, (v) => ((now.size = v), apply(now)));
    slider(bar, 'padding', [0, 40, 1], now.padding, (v) => ((now.padding = v), apply(now)));
    toggle(bar, 'callback: first word', false, (v) => ((now.short = v), apply(now)));
    toggle(bar, 'centerPointLabels', false, (v) => ((now.center = v), apply(now)));
  }
  const stop = ctx.preview ? cycle(STATES, 2200, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
