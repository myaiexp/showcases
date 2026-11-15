// radialArea with radius1: a band between a lower and an upper radius, one per month
import { defineChart, mountChart } from '@tanstack/charts';
import { angleGrid, polar, radialArea, radialGrid, radialLine } from '@tanstack/charts/polar';
import { scaleLinear } from 'd3-scale';
import { scalePoint } from '@tanstack/charts/scales/point';
import { curveCardinalClosed, curveLinearClosed } from 'd3-shape';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const low = [-6, -5, -1, 3, 8, 12, 15, 14, 10, 5, 0, -4];
const high = [1, 3, 8, 14, 19, 23, 26, 25, 20, 13, 6, 2];
const rows = names.map((month, i) => ({ month, low: low[i]!, high: high[i]!, mean: (low[i]! + high[i]!) / 2 }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (smooth: boolean) => {
    const curve = smooth ? curveCardinalClosed : curveLinearClosed;
    return defineChart({
      svgAnimation: true,
      marks: [
        polar({
          guides: [radialGrid({ ticks: 4, stroke: 'currentColor', strokeOpacity: 0.2, labelFill: 'currentColor', labelFontSize: 9, format: (v) => `${v} C` }), angleGrid({ stroke: 'currentColor', strokeOpacity: 0.15 })],
          radiusRatio: 0.85,
          marks: [
            // radius is the outer edge, radius1 the inner edge of the band.
            radialArea(rows, { angle: 'month', radius: 'high', radius1: 'low', curve, fill: '#fb923c', fillOpacity: 0.35, stroke: '#fb923c' }),
            radialLine(rows, { angle: 'month', radius: 'mean', curve, stroke: '#fff', strokeWidth: 1.5 }),
          ],
          scales: {
            angle: { scale: () => scalePoint<string>() },
            radius: { scale: scaleLinear().domain([-10, 30]) },
          },
        }),
      ],
      scales: { x: null, y: null },
    });
  };

  const options = (smooth: boolean) => ({ definition: build(smooth), height: stage.height, ariaLabel: 'Temperature range by month on a polar band' });
  const host = stage.own(mountChart(stage.box, options(false)));
  const show = (smooth: boolean): void => host.update(options(smooth));
  if (stage.bar) checkbox(stage.bar, 'smooth closed curve', false, show);
  else stage.cycle([false, true], 2200, show);
  return () => stage.dispose();
};

export default mount;
