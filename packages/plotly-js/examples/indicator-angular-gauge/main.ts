// An indicator in gauge+number mode: an angular dial with a value and title
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });

  await Plotly.newPlot(
    stage.div,
    [{ domain: { x: [0, 1], y: [0, 1] }, value: 450, title: { text: 'Speed' }, type: 'indicator', mode: 'gauge+number', delta: { reference: 400 }, gauge: { axis: { range: [null, 500] as never } } }],
    { template: stage.template },
    stage.config,
  );

  const set = (v: number): void => void Plotly.restyle(stage.div, { value: v });
  if (stage.bar) slider(stage.bar, 'value', [0, 500, 10], 450, set);
  else stage.every(120, (i) => set(Math.round(250 + 230 * Math.sin(i / 9))));

  return () => stage.dispose();
};

export default mount;
