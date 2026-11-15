// pointerEvent: 'pointerrawupdate' with a check for browser support and a count of both streams
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { weeks } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the mouse over the chart and compare the two counters.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  const show = reader(stage);
  const supported = 'onpointerrawupdate' in window;
  let raw = false;
  const counts = { pointermove: 0, pointerrawupdate: 0 };
  const paint = (): void =>
    show(`pointerEvent: '${raw ? 'pointerrawupdate' : 'pointermove'}'  (raw samples ${supported ? 'supported' : 'not supported here'})\npointermove events: ${counts.pointermove}\npointerrawupdate events: ${counts.pointerrawupdate}`);

  const options = () => ({
    definition: defineChart({
      marks: [lineY(weeks, { x: 'week', y: 'value', key: 'id', points: true })],
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.2) },
        y: { scale: scaleLinear, grid: true },
      },
      pointerEvent: raw ? ('pointerrawupdate' as const) : ('pointermove' as const),
      tooltip,
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Weekly active users',
  });
  const host = stage.own(mountChart(stage.box, options()));

  if (stage.bar) {
    for (const type of ['pointermove', 'pointerrawupdate'] as const) {
      stage.box.addEventListener(type, () => { counts[type]++; paint(); }, { signal: stage.signal });
    }
    checkbox(stage.bar, 'pointerEvent: pointerrawupdate', false, (v) => { raw = v; host.update(options()); paint(); });
    paint();
  } else {
    stage.say("pointerEvent: 'pointerrawupdate' falls back to pointermove");
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
