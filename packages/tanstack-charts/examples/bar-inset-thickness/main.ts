// barY inset and maxThickness: pixel trims applied after band layout
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({ day, visits: [30, 44, 38, 52, 47, 25, 19][i]! }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let inset = 0;
  let cap = 200;

  const chart = () =>
    defineChart({
      marks: [barY(rows, { x: 'day', y: 'visits', inset, maxThickness: cap })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = { definition: chart(), height: stage.height, initialWidth: 640, ariaLabel: 'Visits by weekday with inset bars' };
  const host = stage.own(mountChart(stage.box, options));
  const redraw = (): void => host.update({ ...options, definition: chart() });
  const show = (i: number, c: number): void => {
    inset = i;
    cap = c;
    redraw();
  };

  if (stage.bar) {
    slider(stage.bar, 'inset', 0, 30, 1, 0, (v) => show(v, cap), (v) => `${v}px`);
    slider(stage.bar, 'maxThickness', 6, 200, 2, 200, (v) => show(inset, v), (v) => `${v}px`);
  } else
    stage.cycle([[0, 200], [14, 200], [0, 22], [6, 40]] as const, 1600, ([i, c]) => show(i, c));
  return () => stage.dispose();
};

export default mount;
