// svgAnimation.resize: off, a width change snaps; on, the scene tweens from the painted geometry
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press a width button with the toggle on and then off.' });
  let animate = true;

  const build = (resize: boolean) =>
    defineChart({
      svgAnimation: { duration: 700, easing: 'ease-in-out', resize },
      marks: [barY(revenue, { id: 'revenue', x: 'month', y: 'revenue', key: 'id', fill: '#fb923c' })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.2) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });
  const options = (resize: boolean) => ({ definition: build(resize), height: stage.height, initialWidth: 640, ariaLabel: 'Monthly revenue' });
  const host = stage.own(mountChart(stage.box, options(true)));
  stage.box.style.transition = 'none';
  const setWidth = (p: number): void => {
    stage.box.style.width = `${p}%`;
  };
  if (stage.bar) {
    checkbox(stage.bar, 'svgAnimation.resize', animate, (v) => { animate = v; host.update(options(v)); });
    const wrap = stage.bar;
    for (const p of [100, 60, 35]) {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = `${p}%`;
      b.addEventListener('click', () => setWidth(p));
      wrap.append(b);
    }
  } else {
    stage.cycle([100, 45], 2500, setWidth);
    stage.say('svgAnimation: { resize: true }');
  }
  return () => stage.dispose();
};

export default mount;
