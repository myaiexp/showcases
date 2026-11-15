// layout.uirevision: keep the reader's zoom across Plotly.react, or reset it by changing the value
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button, toggle } from '../../shared/controls.ts';
import { rng } from '../../shared/stat-data.ts';
import { createStage } from '../../shared/stage.ts';
import { guiRelayout } from '../../shared/fund-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const rand = rng(7);
  const x = [1, 2, 3, 4, 5];
  const newData = (): Plotly.Data[] =>
    ['#f59e0b', '#60a5fa', '#34d399'].map((color) => ({ x, y: x.map(() => rand()), mode: 'lines', line: { color } }));

  let revision = 'true';
  let reset = false;
  const layout = (): Partial<Plotly.Layout> => ({
    template: stage.template,
    title: { text: stage.preview ? '' : reset ? 'User zoom resets<br>when uirevision changes' : 'User zoom persists<br>when uirevision is unchanged' },
    uirevision: revision,
    // A reader's zoom turns autorange off, so each update asks for it again.
    xaxis: { autorange: true },
    yaxis: { autorange: true },
  });
  const update = (): void => {
    if (reset) revision = String(rand());
    void Plotly.react(stage.div, newData() as Plotly.Data[], layout());
  };

  await Plotly.react(stage.div, newData() as Plotly.Data[], layout(), stage.config);
  if (stage.bar) {
    toggle(stage.bar, 'change uirevision on every update', false, (v) => (reset = v));
    button(stage.bar, 'Plotly.react now', update);
  }
  if (!stage.preview) stage.every(2500, update);
  else {
    // A reader's zoom, scripted through the same gui path the mouse uses: zoom, update
    // with the same revision (zoom stays), zoom again, update with a new one (it resets).
    stage.every(1100, (i) => {
      const step = i % 4;
      if (step === 0 || step === 2) void guiRelayout(stage.div, { 'xaxis.range': [2, 3.5], 'yaxis.range': [0.2, 0.7] });
      else {
        reset = step === 3;
        update();
      }
    });
  }
  return () => stage.dispose();
};

export default mount;
