// Plotly.purge empties the div; newPlot can draw into it again
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 360 });
  const log = stage.preview ? null : readout(el);
  const draw = (): Promise<unknown> =>
    Plotly.newPlot(stage.div, [{ type: 'bar', y: [2, 5, 3, 6, 4], marker: { color: '#a78bfa' } }], { template: stage.template }, stage.config);
  const report = (what: string): void => {
    if (log) log.textContent = `${what}: the div now has ${stage.div.childElementCount} child element(s), data is ${stage.div.data ? 'set' : 'gone'}`;
  };
  await draw();

  const purge = (): void => {
    // purge will be used on the div that you wish clear of Plotly plots
    Plotly.purge(stage.div);
    report('Plotly.purge');
  };
  if (stage.bar) {
    button(stage.bar, 'Plotly.purge', purge);
    button(stage.bar, 'Plotly.newPlot', () => void draw().then(() => report('Plotly.newPlot')));
    report('Plotly.newPlot');
  }
  if (stage.preview) stage.every(1500, (i) => (i % 2 ? purge() : void draw()));

  return () => stage.dispose();
};

export default mount;
