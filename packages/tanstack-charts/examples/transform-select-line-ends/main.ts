// select last per series: end-of-line labels drawn from the chosen rows
import { defineChart, lineY, mountChart, select, text } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { makeSeries } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const series = makeSeries(50);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const ends = select(series, { by: 'series', select: 'last' });
  const definition = defineChart({
    marks: [
      lineY(series, { x: 'day', y: 'value', color: 'series', strokeWidth: 2.5 }),
      text(ends, { x: 'day', y: 'value', text: 'series', color: 'series', dx: 6, anchor: 'start' }),
    ],
    scales: { x: { scale: scaleLinear().domain([0, 58]) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Two series labelled at their last point' }));
  stage.say("select({ by: 'series', select: 'last' }) -> one row per series");
  return () => stage.dispose();
};

export default mount;
