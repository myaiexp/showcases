// polar startAngle, endAngle, inset and radiusRatio: where the circle sits inside the chart
import { defineChart, mountChart } from '@tanstack/charts';
import { angleGrid, polar, radialBarRadius, radialGrid } from '@tanstack/charts/polar';
import { scaleBand, scaleLinear } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { months } from '../../shared/marks2-months.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const v = { start: 0, sweep: 360, inset: 0, ratio: 1 };

  const build = () =>
    defineChart({
      marks: [
        polar({
          startAngle: (v.start * Math.PI) / 180,
          endAngle: ((v.start + v.sweep) * Math.PI) / 180,
          inset: v.inset,
          radiusRatio: v.ratio,
          guides: [radialGrid({ ticks: 3, stroke: 'currentColor', strokeOpacity: 0.2, labels: false }), angleGrid({ stroke: 'currentColor', strokeOpacity: 0.12, labels: false })],
          marks: [radialBarRadius(months, { angle: 'month', radius: 'rain', color: 'season', cornerRadius: 2 })],
          scales: {
            angle: { scale: () => scaleBand<string>().paddingInner(0.1) },
            radius: { scale: scaleLinear().domain([0, 100]) },
          },
        }),
      ],
      scales: { x: null, y: null },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Radial bars in a configurable polar layout' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`startAngle ${v.start} deg, sweep ${v.sweep} deg, inset ${v.inset}px, radiusRatio ${v.ratio.toFixed(2)}`);
  };
  refresh();
  if (stage.bar) {
    slider(stage.bar, 'startAngle', -180, 180, 15, v.start, (x) => { v.start = x; refresh(); }, (x) => `${x} deg`);
    slider(stage.bar, 'sweep', 90, 360, 15, v.sweep, (x) => { v.sweep = x; refresh(); }, (x) => `${x} deg`);
    slider(stage.bar, 'inset', 0, 60, 2, v.inset, (x) => { v.inset = x; refresh(); }, (x) => `${x}px`);
    slider(stage.bar, 'radiusRatio', 0.4, 1, 0.05, v.ratio, (x) => { v.ratio = x; refresh(); }, (x) => x.toFixed(2));
  } else {
    stage.cycle([[0, 360, 0, 1], [-90, 180, 0, 1], [0, 270, 20, 0.8], [-135, 270, 0, 0.7]] as const, 1700, ([s, w, i, r]) => { Object.assign(v, { start: s, sweep: w, inset: i, ratio: r }); refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
