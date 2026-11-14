// Monthly high temperatures, each bar coloured by a function of its own value
import type { ScriptableContext } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';

const HIGHS = [-3, -4, 1, 8, 15, 20, 23, 21, 15, 8, 2, -2];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let cold = 0;
  let hot = 20;

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: 'Average high (°C)',
          data: HIGHS,
          borderWidth: 1,
          // options.md § Scriptable Options: called once per bar. Check context.type,
          // because the same function can be called in other contexts.
          backgroundColor: (c: ScriptableContext<'bar'>) => {
            if (c.type !== 'data') return alpha(C.grey, 0.5);
            const value = c.raw as number;
            return alpha(value < cold ? C.blue : value > hot ? C.red : C.amber, 0.7);
          },
          borderColor: (c: ScriptableContext<'bar'>) => {
            const value = c.raw as number;
            return value < cold ? C.blue : value > hot ? C.red : C.amber;
          },
        },
      ],
    },
    options: { maintainAspectRatio: false, plugins: { legend: { display: false } } },
  });

  // The functions read `cold` and `hot`, so a change needs chart.update().
  const apply = (): void => {
    chart.update();
    label.textContent = `blue < ${cold}°   red > ${hot}°`;
  };
  apply();

  if (bar) {
    slider(bar, 'cold below', [-5, 15, 1], cold, (v) => ((cold = v), apply()));
    slider(bar, 'hot above', [10, 25, 1], hot, (v) => ((hot = v), apply()));
  }
  const stop = ctx.preview
    ? cycle([[0, 20], [8, 20], [8, 12], [-3, 16]] as const, 1800, ([c, h]) => {
        cold = c;
        hot = h;
        apply();
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
