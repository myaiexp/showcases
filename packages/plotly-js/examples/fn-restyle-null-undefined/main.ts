// restyle with null (back to the default) and undefined (leave as is) per trace
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const custom = { line: { color: '#e879f9', width: 4 } };
  const trace = (k: number) => ({ y: [0, 1, 2, 3, 4].map((x) => k * 1.2 + Math.cos(x * 1.3 + k)), name: `trace ${k}`, ...structuredClone(custom) });

  await Plotly.newPlot(stage.div, [trace(0), trace(1), trace(2)], { template: stage.template, showlegend: !stage.preview }, stage.config);

  const apply = (): Promise<unknown> =>
    // Set the first trace's line to red, the second to the default, and ignore the third
    Plotly.restyle(stage.div, { 'line.color': ['red', null, undefined] }, [0, 1, 2]);
  const reset = (): Promise<unknown> => Plotly.restyle(stage.div, { 'line.color': '#e879f9' });

  if (stage.bar) {
    button(stage.bar, "'line.color': ['red', null, undefined]", () => void apply());
    button(stage.bar, 'all magenta again', () => void reset());
  }
  if (stage.preview) stage.every(1500, (i) => void (i % 2 ? apply() : reset()));

  return () => stage.dispose();
};

export default mount;
