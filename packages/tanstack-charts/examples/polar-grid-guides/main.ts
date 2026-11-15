// radialGrid and angleGrid: circle or polygon rings, ring fills, tick values and label options
import { defineChart, mountChart } from '@tanstack/charts';
import { scalePoint } from '@tanstack/charts/scales/point';
import { angleGrid, polar, radialDot, radialGrid } from '@tanstack/charts/polar';
import { scaleLinear } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { checkbox, select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const axes = ['North', 'East', 'South', 'West', 'Up', 'Down'];
const points = axes.map((axis, i) => ({ axis, value: [70, 45, 88, 52, 66, 30][i]! }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const v = { shape: 'polygon' as 'circle' | 'polygon', ticks: 4, filled: true, spokes: true };

  const build = () =>
    defineChart({
      marks: [
        polar({
          radiusRatio: 0.8,
          guides: [
            radialGrid({
              shape: v.shape,
              ticks: v.ticks,
              stroke: 'currentColor',
              strokeOpacity: 0.3,
              ...(v.filled ? { fill: '#60a5fa', fillOpacity: 0.05 } : {}),
              labels: true,
              labelFill: 'currentColor',
              labelFontSize: 10,
              labelAngle: Math.PI / 6,
              format: (value) => `${value}%`,
            }),
            ...(v.spokes ? [angleGrid({ stroke: 'currentColor', strokeOpacity: 0.3, labelOffset: 14 })] : []),
          ],
          marks: [radialDot(points, { angle: 'axis', radius: 'value', r: 4, fill: '#fbbf24' })],
          scales: {
            angle: { scale: () => scalePoint<string>() },
            radius: { scale: scaleLinear().domain([0, 100]) },
          },
        }),
      ],
      scales: { x: null, y: null },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Polar grid guides' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => host.update(options());
  if (stage.bar) {
    select(stage.bar, 'ring shape', [['polygon', 'polygon'], ['circle', 'circle']] as const, (s) => { v.shape = s; refresh(); });
    slider(stage.bar, 'ticks', 1, 10, 1, v.ticks, (x) => { v.ticks = x; refresh(); });
    checkbox(stage.bar, 'ring fill', v.filled, (x) => { v.filled = x; refresh(); });
    checkbox(stage.bar, 'spokes', v.spokes, (x) => { v.spokes = x; refresh(); });
  } else {
    stage.cycle([['polygon', 4], ['circle', 4], ['circle', 8], ['polygon', 2]] as const, 1600, ([s, t]) => { v.shape = s; v.ticks = t; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
