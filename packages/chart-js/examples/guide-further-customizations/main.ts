// A bubble chart tidied in three steps: shape, axis ends, units
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, toggle } from '../../shared/controls.ts';
import { paintingSizes, bubble } from '../../shared/dev-data.ts';
import { C, alpha } from '../../shared/data.ts';

interface Steps {
  square: boolean;
  fixedEnds: boolean;
  units: boolean;
}

const STEPS: readonly Steps[] = [
  { square: false, fixedEnds: false, units: false },
  { square: true, fixedEnds: false, units: false },
  { square: true, fixedEnds: true, units: false },
  { square: true, fixedEnds: true, units: true },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el);
  stage.box.style.display = 'flex';
  stage.box.style.justifyContent = 'center';

  const chart = new Chart(stage.canvas, {
    type: 'bubble',
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
    options: { plugins: { legend: { display: false } } },
  });

  // usage.md § Further customizations: aspectRatio, scales.x/y.max, ticks.callback.
  const apply = ({ square, fixedEnds, units }: Steps): void => {
    chart.options.aspectRatio = square ? 1 : 2;
    for (const axis of ['x', 'y'] as const) {
      // update() rebuilds the scale options, so read them again each time.
      const scale = chart.options.scales![axis]!;
      scale.max = fixedEnds ? 500 : undefined;
      scale.ticks = { callback: units ? (value) => `${Number(value) / 100} m` : (value) => value };
    }
    chart.update();
    chart.resize();
    note.textContent = `ratio ${square ? 1 : 2} · max ${fixedEnds ? 500 : 'auto'} · ${units ? 'metres' : 'numbers'}`;
  };

  let stop = (): void => {};
  if (bar) {
    const state = { ...STEPS[0]! };
    toggle(bar, 'square (aspectRatio: 1)', false, (v) => apply({ ...state, square: (state.square = v) }));
    toggle(bar, 'axis max 500', false, (v) => apply({ ...state, fixedEnds: (state.fixedEnds = v) }));
    toggle(bar, 'ticks in metres', false, (v) => apply({ ...state, units: (state.units = v) }));
  } else {
    stop = cycle(STEPS, 2400, apply);
  }
  apply(STEPS[0]!);

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
