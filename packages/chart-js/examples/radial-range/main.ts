// Exam scores on a radar: min/max, suggested limits and startAngle shape the scale
import type { RadialLinearScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

type Range = 'auto' | 'min 0 / max 100' | 'suggestedMin 0 / suggestedMax 100' | 'min 60 / max 100';
const RANGES: Range[] = ['auto', 'min 0 / max 100', 'suggestedMin 0 / suggestedMax 100', 'min 60 / max 100'];
interface State {
  range: Range;
  start: number;
}
const STATES: State[] = [
  { range: 'auto', start: 0 },
  { range: 'min 0 / max 100', start: 0 },
  { range: 'suggestedMin 0 / suggestedMax 100', start: 0 },
  { range: 'min 60 / max 100', start: 45 },
  { range: 'min 0 / max 100', start: 180 },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'radar',
    data: {
      labels: ['Maths', 'Physics', 'History', 'Art', 'Music', 'Biology'],
      datasets: [{ label: 'Score', data: [78, 84, 66, 72, 88, 75], fill: true, borderColor: C.amber, backgroundColor: alpha(C.amber, 0.25), pointBackgroundColor: C.amber }],
    },
    options: {
      maintainAspectRatio: false,
      scales: { r: { ticks: { showLabelBackdrop: false } } },
      plugins: { legend: { display: false } },
    },
  });
  // Partial: the limits are reset to undefined below.
  const r = (): Partial<RadialLinearScaleOptions> => chart.options.scales!.r as Partial<RadialLinearScaleOptions>;

  // radial/linear.md § Axis Range Settings: min/max are hard ends, suggested ones only
  // widen the auto range; startAngle is in degrees, 0 at the top.
  const apply = ({ range, start }: State): void => {
    r().min = range === 'min 0 / max 100' ? 0 : range === 'min 60 / max 100' ? 60 : undefined;
    r().max = range.includes('min ') ? 100 : undefined;
    r().suggestedMin = range.startsWith('suggested') ? 0 : undefined;
    r().suggestedMax = range.startsWith('suggested') ? 100 : undefined;
    r().startAngle = start;
    chart.update();
    label.textContent = `${range === 'auto' ? 'automatic range' : range} · startAngle ${start}`;
  };
  apply(STATES[0]!);

  if (bar) {
    const now: State = { ...STATES[0]! };
    select(bar, 'range', RANGES, now.range, (v) => ((now.range = v), apply(now)));
    slider(bar, 'startAngle', [0, 360, 15], now.start, (v) => ((now.start = v), apply(now)));
  }
  const stop = ctx.preview ? cycle(STATES, 2400, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
