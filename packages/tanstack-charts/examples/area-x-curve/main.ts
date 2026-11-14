// areaX curve option: d3AreaXCurve adapts a d3-shape curve to the transposed area
import { curveBasis, curveStep } from 'd3-shape';
import { areaX, defineChart, mountChart } from '@tanstack/charts';
import { d3AreaXCurve } from '@tanstack/charts/d3/area-x';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = Array.from({ length: 16 }, (_, i) => ({ y: i, x1: 20 - 10 * Math.sin(i / 3), x2: 55 + 18 * Math.cos(i / 2.2) }));

const curves = [
  [undefined, 'straight'],
  [d3AreaXCurve(curveBasis), 'curveBasis'],
  [d3AreaXCurve(curveStep), 'curveStep'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (curve: (typeof curves)[number][0]) =>
    defineChart({
      svgAnimation: true,
      marks: [areaX(rows, { y: 'y', x1: 'x1', x2: 'x2', fillOpacity: 0.4, stroke: 'currentColor', strokeWidth: 1, curve })],
      scales: {
        x: { scale: scaleLinear, nice: true, grid: true },
        y: { scale: scaleLinear, reverse: true },
      },
    });

  const options = { definition: chart(undefined), height: stage.height, initialWidth: 640, ariaLabel: 'A horizontal band drawn with a curve' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (i: number): void => {
    host.update({ ...options, definition: chart(curves[i]![0]) });
    stage.say(curves[i]![1]);
  };

  if (stage.bar) {
    select(stage.bar, 'curve', curves.map((c, i) => [i, c[1]] as const), show);
    stage.say(curves[0][1]);
  } else stage.cycle(curves.map((_, i) => i), 1800, show);
  return () => stage.dispose();
};

export default mount;
