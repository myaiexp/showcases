// Server load past 100%: min/max cut the bar off, suggestedMax stretches
import type { LinearScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { C } from '../../shared/data.ts';

type Kind = 'min / max' | 'suggestedMin / suggestedMax';
interface State {
  kind: Kind;
  peak: number;
}
const STATES: State[] = [
  { kind: 'min / max', peak: 80 },
  { kind: 'min / max', peak: 140 },
  { kind: 'suggestedMin / suggestedMax', peak: 140 },
  { kind: 'suggestedMin / suggestedMax', peak: 80 },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);

  const load = [42, 55, 61, 80, 58, 47];
  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      datasets: [{ label: 'CPU load (%)', data: load, backgroundColor: C.blue }],
    },
    options: { maintainAspectRatio: false, scales: { y: {} }, plugins: { legend: { display: false } } },
  });
  // Partial: min and max are reset to undefined below.
  const y = (): Partial<LinearScaleOptions> => chart.options.scales!.y as Partial<LinearScaleOptions>;

  // axes/index.md § Axis Range Settings: min/max are hard ends; the suggested values only
  // widen the range, and data beyond them still pushes the axis out.
  const apply = ({ kind, peak }: State): void => {
    const hard = kind === 'min / max';
    y().min = hard ? 0 : undefined;
    y().max = hard ? 100 : undefined;
    y().suggestedMin = hard ? undefined : 0;
    y().suggestedMax = hard ? undefined : 100;
    load[3] = peak;
    chart.update();
    const key = hard ? ['min', 'max'] : ['suggestedMin', 'suggestedMax'];
    label.textContent = `${key[0]}: 0, ${key[1]}: 100 · peak ${peak}%`;
  };
  apply(STATES[0]!);

  if (bar) {
    const now: State = { ...STATES[0]! };
    select(bar, 'limits', ['min / max', 'suggestedMin / suggestedMax'] as const, now.kind, (v) => {
      now.kind = v;
      apply(now);
    });
    slider(bar, 'Noon peak (%)', [40, 160, 5], now.peak, (v) => {
      now.peak = v;
      apply(now);
    });
  }
  const stop = ctx.preview ? cycle(STATES, 2200, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
