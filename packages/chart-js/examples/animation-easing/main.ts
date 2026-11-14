// Bars regrow each time with a different easing curve, picked from a list
import type { EasingFunction } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { button, controlBar, select } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

// animations.md § Easing: the curve decides how motion speeds up and slows down.
const EASINGS = [
  'linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic',
  'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint', 'easeOutQuint', 'easeInOutQuint',
  'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInExpo', 'easeOutExpo', 'easeInOutExpo',
  'easeInCirc', 'easeOutCirc', 'easeInOutCirc', 'easeInElastic', 'easeOutElastic', 'easeInOutElastic',
  'easeInBack', 'easeOutBack', 'easeInOutBack', 'easeInBounce', 'easeOutBounce', 'easeInOutBounce',
] as const satisfies readonly EasingFunction[];

const CARD_EASINGS = ['linear', 'easeInQuad', 'easeOutBounce', 'easeOutElastic', 'easeInOutBack'] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, `easing: '${CARD_EASINGS[0]}'`);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Visitors',
          data: [120, 150, 135, 170, 210, 260, 190],
          backgroundColor: alpha(C.blue, 0.65),
          borderColor: C.blue,
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      // The easing and the duration are both options.animation keys.
      animation: { easing: CARD_EASINGS[0], duration: 1500 },
      scales: { y: { beginAtZero: true, max: 300 } },
      plugins: { legend: { display: false } },
    },
  });

  // reset() puts the bars back to their start, update() plays the animation again.
  const replay = (): void => {
    chart.reset();
    chart.update();
  };
  const setEasing = (easing: EasingFunction): void => {
    chart.options.animation = { ...(chart.options.animation || {}), easing };
    note.textContent = `easing: '${easing}'`;
    replay();
  };

  if (bar) {
    select(bar, 'Easing', EASINGS, 'linear', setEasing);
    button(bar, 'Replay', replay);
  }
  const stop = ctx.preview ? cycle(CARD_EASINGS, 2600, setEasing) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
