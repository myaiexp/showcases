// One property of a line (tension, point size or width) pulses forever
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

type Prop = 'tension' | 'radius' | 'borderWidth';
const PROPS: readonly Prop[] = ['tension', 'radius', 'borderWidth'];
// Where each property starts and ends on every loop.
const RANGE: Record<Prop, [number, number]> = { tension: [1, 0], radius: [2, 14], borderWidth: [1, 10] };

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el);
  let chart: Chart<'line'> | null = null;

  const build = (prop: Prop): void => {
    chart?.destroy();
    note.textContent = `animations.${prop}: { loop: true }`;
    const [from, to] = RANGE[prop];
    chart = new Chart(stage.canvas, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Resting heart rate',
            data: [62, 58, 64, 66, 54, 57, 60],
            borderColor: C.pink,
            backgroundColor: alpha(C.pink, 0.5),
            pointRadius: 4,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        // Room for the largest point and the thickest line at the plot's edge.
        layout: { padding: 12 },
        // animations.md, "Looping tension": name the property, give it from/to and loop: true.
        animations: { [prop]: { duration: 1000, easing: 'linear', from, to, loop: true } },
        // Fixed range, so the line itself is the only thing that moves.
        scales: { y: { min: 40, max: 80 } },
        plugins: { legend: { display: !ctx.preview } },
      },
    });
  };

  build('tension');
  if (bar) select(bar, 'Animated property', PROPS, 'tension', build);
  const stop = ctx.preview ? cycle(PROPS, 3600, build) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
