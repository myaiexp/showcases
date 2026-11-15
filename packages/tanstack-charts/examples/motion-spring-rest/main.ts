// restDelta and restSpeed: absolute thresholds that decide when a sampled spring is done
import { defineChart, lineY, ruleX } from '@tanstack/charts';
import { mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { sampleSpring } from '../../shared/style-spring.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Raise restDelta: the spring is declared done earlier, still short of the target.' });
  const readout = stage.bar ? stage.readout() : null;
  const options = { stiffness: 170, damping: 10, mass: 1 };
  const build = (rest: number) => {
    const strict = sampleSpring('defaults', options, 2500, 10);
    const loose = sampleSpring('loose', { ...options, restDelta: rest, restSpeed: rest * 2 }, 2500, 10);
    if (readout) readout.textContent = `defaults (restDelta 0.005, restSpeed 0.01): done at ${strict.doneAt ?? '>2500'} ms\nrestDelta ${rest}, restSpeed ${rest * 2}: done at ${loose.doneAt ?? '>2500'} ms`;
    else stage.say(`restDelta ${rest}: done at ${loose.doneAt} ms (defaults ${strict.doneAt} ms)`);
    return defineChart({
      marks: [
        lineY([...strict.rows, ...loose.rows], { x: 'ms', y: 'value', z: 'label', strokeWidth: 2 }),
        ruleX([strict.doneAt ?? 0], { stroke: '#60a5fa', strokeDasharray: '4 4' }),
        ruleX([loose.doneAt ?? 0], { stroke: '#fb923c', strokeDasharray: '4 4' }),
      ],
      scales: {
        x: { scale: scaleLinear, axis: { label: 'elapsed (ms)' } },
        y: { scale: () => scaleLinear().domain([0, 120]), grid: true },
      },
    });
  };
  const options2 = (rest: number) => ({ definition: build(rest), height: stage.height, ariaLabel: 'Spring step response with two rest thresholds' });
  const host = stage.own(mountChart(stage.box, options2(1)));
  if (stage.bar) slider(stage.bar, 'restDelta', 0.01, 10, 0.01, 1, (v) => host.update(options2(v)), (v) => v.toFixed(2));
  else stage.cycle([0.5, 4, 10], 1800, (v) => host.update(options2(v)));
  return () => stage.dispose();
};

export default mount;
