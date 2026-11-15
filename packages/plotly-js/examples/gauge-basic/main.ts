// The smallest gauge: an indicator in gauge+number mode with title and value
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [{ domain: { x: [0, 1], y: [0, 1] }, value: 270, title: { text: 'Speed' }, type: 'indicator', mode: 'gauge+number' }],
    { template: stage.template, margin: { t: stage.preview ? 20 : 0, b: 0 } },
    stage.config,
  );

  const set = (v: number): void => void Plotly.restyle(stage.div, { value: v });
  if (stage.bar) slider(stage.bar, 'value', [0, 300, 5], 270, set);
  else stage.every(140, (i) => set(Math.round(150 + 130 * Math.sin(i / 8))));

  return () => stage.dispose();
};

export default mount;
