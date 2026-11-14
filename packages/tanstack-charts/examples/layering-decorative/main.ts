// decorative(mark) keeps the line painted but removes its focus points, so the dots own interaction
import { defineChart, dot, lineY, mountChart } from '@tanstack/charts';
import { decorative } from '@tanstack/charts/mark/decorative';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { signups } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the chart: the readout counts the interaction points and names the owner.' });
  const readout = stage.preview ? null : stage.readout();
  let decor = true;

  const build = () =>
    defineChart({
      marks: [
        decor ? decorative(lineY(signups, { id: 'line', x: 'month', y: 'value', stroke: '#60a5fa' })) : lineY(signups, { id: 'line', x: 'month', y: 'value', stroke: '#60a5fa' }),
        dot(signups, { id: 'dots', x: 'month', y: 'value', r: 5, fill: '#60a5fa' }),
      ],
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.2) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      tooltip,
    });

  const options = () => ({
    definition: build(),
    height: stage.height,
    ariaLabel: 'Signups',
    onFocusChange: (point: { markId: string } | null) => {
      if (readout) readout.textContent = `${host.getScene().points.length} interaction points, focused mark: ${point ? point.markId : 'none'}`;
    },
  });
  const host = stage.own(mountChart(stage.box, options()));
  const set = (v: boolean): void => {
    decor = v;
    host.update(options());
    stage.say(v ? 'line is decorative' : 'line and dots both interactive');
    if (readout) readout.textContent = `${host.getScene().points.length} interaction points`;
  };
  if (stage.bar) checkbox(stage.bar, 'decorative line', true, set);
  else {
    stage.cycle([true, false], 2500, set);
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
