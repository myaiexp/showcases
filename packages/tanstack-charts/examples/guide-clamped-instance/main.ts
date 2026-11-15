// Instance scales keep clamp: out-of-range values stop at the plot edge instead of leaving it
import { defineChart, dot, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const readings = [42, 55, 61, 48, 130, 72, 66, -20, 58, 63].map((value, i) => ({ id: `r${i}`, i, value }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two readings (130 and -20) are outside the 0 to 100 domain.' });
  const build = (clamp: boolean) =>
    defineChart({
      marks: [lineY(readings, { x: 'i', y: 'value', stroke: '#22d3ee', strokeWidth: 2 }), dot(readings, { x: 'i', y: 'value', r: 4, fill: '#22d3ee' })],
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear().domain([0, 100]).clamp(clamp), grid: true } },
    });
  const options = (clamp: boolean) => ({ definition: build(clamp), height: stage.height, ariaLabel: 'Sensor readings with two spikes' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const apply = (v: boolean): void => {
    host.update(options(v));
    stage.say(v ? 'scaleLinear().domain([0, 100]).clamp(true)' : 'scaleLinear().domain([0, 100])');
  };
  if (stage.bar) checkbox(stage.bar, 'clamp', true, apply);
  else stage.cycle([true, false], 2200, apply);
  return () => stage.dispose();
};

export default mount;
