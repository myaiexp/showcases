// d3Curve adapts a D3 curve factory to a line and area; straight segments need no d3-shape
import { areaY, d3Curve, defineChart, dot, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { curveBasis, curveCatmullRom, curveLinear, curveMonotoneX, curveStep } from 'd3-shape';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { signups } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const curves = [
  ['curveLinear', curveLinear],
  ['curveMonotoneX', curveMonotoneX],
  ['curveStep', curveStep],
  ['curveBasis', curveBasis],
  ['curveCatmullRom', curveCatmullRom],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (curve: (typeof curves)[number][1]) =>
    defineChart({
      marks: [
        areaY(signups, { x: 'month', y: 'value', curve: d3Curve(curve), fillOpacity: 0.2 }),
        lineY(signups, { x: 'month', y: 'value', curve: d3Curve(curve), stroke: '#60a5fa', strokeWidth: 2 }),
        dot(signups, { x: 'month', y: 'value', r: 3, fill: '#60a5fa' }),
      ],
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.2) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = (curve: (typeof curves)[number][1]) => ({ definition: build(curve), height: stage.height, ariaLabel: 'Signups with a curve' });
  const host = stage.own(mountChart(stage.box, options(curveLinear)));
  const show = (curve: (typeof curves)[number][1], name: string): void => {
    host.update(options(curve));
    stage.say(name);
  };
  if (stage.bar) select(stage.bar, 'curve', curves.map(([n, c]) => [c, n] as const), (c) => show(c, ''));
  else stage.cycle(curves, 1500, ([n, c]) => show(c, n));
  return () => stage.dispose();
};

export default mount;
