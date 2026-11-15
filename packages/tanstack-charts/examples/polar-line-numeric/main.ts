// radialLine with numeric angles: a polar curve drawn from a function, with a curve factory
import { defineChart, mountChart } from '@tanstack/charts';
import { angleGrid, polar, radialGrid, radialLine } from '@tanstack/charts/polar';
import { curveBasis, curveLinear } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const v = { petals: 5, smooth: true };

  const build = () => {
    // A rose curve: radius = cos(k * angle), sampled every 4 degrees.
    const samples = Array.from({ length: 91 }, (_, i) => {
      const angle = (i * 4 * Math.PI) / 180;
      return { angle, radius: Math.abs(Math.cos((v.petals * angle) / 2)) };
    });
    return defineChart({
      marks: [
        polar({
          guides: [radialGrid({ ticks: 4, stroke: 'currentColor', strokeOpacity: 0.15, labels: false }), angleGrid({ stroke: 'currentColor', strokeOpacity: 0.15, labels: false })],
          radiusRatio: 0.92,
          marks: [radialLine(samples, { angle: 'angle', radius: 'radius', curve: v.smooth ? curveBasis : curveLinear, stroke: '#f472b6', strokeWidth: 2 })],
          scales: {
            angle: { scale: scaleLinear().domain([0, 2 * Math.PI]) },
            radius: { scale: scaleLinear().domain([0, 1]) },
          },
        }),
      ],
      scales: { x: null, y: null },
    });
  };

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'A polar rose curve' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`radius = |cos(${v.petals} x angle / 2)|, curve ${v.smooth ? 'curveBasis' : 'curveLinear'}`);
  };
  refresh();
  if (stage.bar) {
    slider(stage.bar, 'k', 1, 12, 1, v.petals, (x) => { v.petals = x; refresh(); });
    checkbox(stage.bar, 'smooth curve', v.smooth, (x) => { v.smooth = x; refresh(); });
  } else {
    stage.cycle([5, 3, 8, 2, 7], 1400, (k) => { v.petals = k; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
