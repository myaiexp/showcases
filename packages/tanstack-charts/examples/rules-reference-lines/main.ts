// ruleX and ruleY: full-height and full-width reference lines drawn from data rows
import { defineChart, lineY, mountChart, ruleX, ruleY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { sensorA } from '../../shared/marks2-series.ts';
import { createStage } from '../../shared/stage.ts';

const releases = [
  { month: 2.5, note: 'v1' },
  { month: 6, note: 'v2' },
  { month: 9.5, note: 'v3' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (target: boolean) =>
    defineChart({
      svgAnimation: true,
      marks: [
        ruleX(releases, { x: 'month', stroke: '#f87171', strokeDasharray: '4 3' }),
        ...(target ? [ruleY([30], { stroke: '#4ade80', strokeOpacity: 0.8, strokeDasharray: '6 3' })] : []),
        ruleY([0], { strokeOpacity: 0.7 }),
        lineY(sensorA, { x: 'month', y: 'value' }),
      ],
      scales: {
        x: { scale: scaleLinear, nice: true },
        y: { scale: scaleLinear().domain([0, 60]) },
      },
    });

  const options = (target: boolean) => ({ definition: build(target), height: stage.height, ariaLabel: 'Readings with release markers and a target line' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const show = (target: boolean): void => {
    host.update(options(target));
    stage.say('ruleX draws one vertical line per release row; ruleY draws a line per value in its array.');
  };
  if (stage.bar) checkbox(stage.bar, 'target line at 30', true, show);
  else stage.cycle([true, false], 2200, show);
  return () => stage.dispose();
};

export default mount;
