// respectReducedMotion: the tween snaps when the OS asks for reduced motion, unless this option is off
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { barStep } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click new data. With reduced motion on in your system, bars snap unless the toggle is off.' });
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  let respect = true;
  const build = (step: number, r: boolean) =>
    defineChart({
      svgAnimation: { duration: 900, easing: 'ease-in-out', respectReducedMotion: r },
      marks: [barY(barStep(step), { x: 'label', y: 'value', key: 'id', fill: '#34d399' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: () => scaleLinear().domain([0, 110]), grid: true } },
    });
  const options = (step: number) => ({ definition: build(step, respect), height: stage.height, ariaLabel: 'Six values that change' });
  const host = stage.own(mountChart(stage.box, options(0)));
  const status = (): string => `prefers-reduced-motion: ${query.matches ? 'reduce' : 'no-preference'}   respectReducedMotion: ${respect}`;
  let step = 0;
  const next = (): void => {
    step++;
    host.update(options(step));
    stage.say(status());
  };
  if (stage.bar) {
    checkbox(stage.bar, 'respectReducedMotion', true, (v) => { respect = v; stage.say(status()); });
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = 'new data';
    b.addEventListener('click', next);
    stage.bar.append(b);
    stage.say(status());
  } else stage.every(1800, next);
  return () => stage.dispose();
};

export default mount;
