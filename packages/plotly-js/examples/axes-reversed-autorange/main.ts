// autorange: 'reversed' flips an axis while still fitting the data
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 360 });
  await Plotly.newPlot(
    stage.div,
    [{ x: [1, 2], y: [1, 2], type: 'scatter', marker: { size: 10 } }],
    { template: stage.template, xaxis: { autorange: 'reversed' } },
    stage.config,
  );
  const flip = (reversed: boolean): Promise<void> => relayout(stage.div, { 'xaxis.autorange': reversed ? 'reversed' : true });
  if (stage.bar) toggle(stage.bar, "xaxis.autorange: 'reversed'", true, (v) => void flip(v));
  if (stage.preview) stage.every(1500, (i) => void flip(i % 2 === 0));
  return () => stage.dispose();
};

export default mount;
