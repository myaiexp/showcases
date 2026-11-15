// An explicit margin side locks that side only; the other sides stay automatic
import { barX, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { features } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Lock the left margin: long labels are now clipped by a margin that no longer adapts.' });
  const readout = stage.bar ? stage.readout() : null;
  let locked = true;
  let left = 96;

  const build = () =>
    defineChart({
      marks: [barX(features, { x: 'weeklyRequests', y: 'feature', fill: '#a78bfa', inset: 1 })],
      scales: {
        x: { scale: scaleLinear, nice: true, grid: true, axis: { ticks: { count: 5 } } },
        y: { scale: () => scaleBand<string>().padding(0.1) },
      },
      ...(locked ? { margin: { left } } : {}),
    });
  const options = () => ({
    definition: build(),
    height: stage.height,
    ariaLabel: 'Feature requests per week',
    onRender: ({ scene }: { scene: { margin: { top: number; right: number; bottom: number; left: number } } }) => {
      const m = scene.margin;
      const text = `${locked ? `margin: { left: ${left} }` : 'margin omitted'}\ntop ${Math.round(m.top)}  right ${Math.round(m.right)}  bottom ${Math.round(m.bottom)}  left ${Math.round(m.left)}`;
      if (readout) readout.textContent = text;
    },
  });
  const host = stage.own(mountChart(stage.box, options()));
  if (stage.bar) {
    checkbox(stage.bar, 'lock left margin', locked, (v) => { locked = v; host.update(options()); });
    slider(stage.bar, 'left', 20, 220, 4, left, (v) => { left = v; host.update(options()); }, (v) => `${v}px`);
  } else {
    stage.cycle([true, false], 2200, (v) => {
      locked = v;
      host.update(options());
      stage.say(v ? 'margin: { left: 96 }' : 'margin omitted');
    });
  }
  return () => stage.dispose();
};

export default mount;
