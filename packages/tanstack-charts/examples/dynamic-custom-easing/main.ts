// svgAnimation.easing as a function: a back-out curve that overshoots, against linear
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { barStep } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const backOut = (t: number): number => {
  const c = 2.2;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Bars overshoot their new value with the back-out function.' });
  let back = true;
  let flip = 0;
  const build = () =>
    defineChart({
      svgAnimation: { duration: 900, easing: back ? backOut : 'linear' },
      marks: [barY(barStep(flip % 2), { x: 'label', y: 'value', key: 'id', fill: '#fb923c' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear().domain([0, 130]), grid: true } },
    });
  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Six values that alternate' });
  const host = stage.own(mountChart(stage.box, options()));
  const replay = (): void => {
    flip++;
    host.update(options());
  };
  if (stage.bar) {
    checkbox(stage.bar, 'back-out easing', true, (v) => { back = v; });
    stage.every(2000, replay);
  } else {
    stage.cycle([true, false], 1900, (v) => { back = v; replay(); stage.say(v ? 'easing: (t) => back-out' : "easing: 'linear'"); });
  }
  return () => stage.dispose();
};

export default mount;
