// ridgelineY curve and outline options
import { curveBasis } from 'd3-shape';
import { defineChart, mountChart, ridgelineY } from '@tanstack/charts';
import { d3Curve } from '@tanstack/charts/d3/shape';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { seasonProfiles, seasons } from '../../shared/marks1-seasons.ts';
import { createStage } from '../../shared/stage.ts';

const smooth = d3Curve(curveBasis);

const looks = [
  [{}, 'straight, default outline'],
  [{ curve: smooth }, 'curve: d3Curve(curveBasis)'],
  [{ curve: smooth, stroke: null }, 'stroke: null (no outline)'],
  [{ curve: smooth, strokeDasharray: '4 3', strokeWidth: 1.5 }, "strokeDasharray: '4 3'"],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (look: Record<string, unknown>) =>
    defineChart({
      svgAnimation: true,
      marks: [ridgelineY(seasonProfiles, { x: 'position', y: 'group', height: 'height', overlap: 1.1, color: 'group', fillOpacity: 0.55, ...look })],
      scales: {
        x: { scale: scaleLinear().domain([0, 10]), grid: true },
        y: { scale: scalePoint<string>().domain(seasons).padding(1.1), reverse: true },
      },
    });

  const options = { definition: chart({}), height: stage.height, initialWidth: 640, ariaLabel: 'Ridgeline with a chosen curve and outline' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (i: number): void => {
    host.update({ ...options, definition: chart(looks[i]![0]) });
    stage.say(looks[i]![1]);
  };

  if (stage.bar) {
    select(stage.bar, 'look', looks.map((l, i) => [i, l[1]] as const), show);
    stage.say(looks[0][1]);
  } else stage.cycle(looks.map((_, i) => i), 1800, show);
  return () => stage.dispose();
};

export default mount;
