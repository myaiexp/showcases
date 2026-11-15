// xaxis.tickmode: auto, linear (tick0 and dtick) or array (tickvals and ticktext)
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { pick, relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['auto', 'linear', 'array'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const y = [28.8, 28.5, 37, 56.8, 69.7, 79.7, 78.5, 77.8, 74.1, 62.6, 45.3, 39.9];
  const state = { tick0: 0.5, dtick: 0.75 };

  await Plotly.newPlot(
    stage.div,
    [{ x, y, type: 'scatter' }],
    { template: stage.template, xaxis: { tickmode: 'linear', tick0: state.tick0, dtick: state.dtick, tickvals: [1, 3, 5, 7, 9, 11], ticktext: ['One', 'Three', 'Five', 'Seven', 'Nine', 'Eleven'] } },
    stage.config,
  );
  const mode = (m: Mode): Promise<void> => relayout(stage.div, { 'xaxis.tickmode': m, 'xaxis.tick0': state.tick0, 'xaxis.dtick': state.dtick });
  if (stage.bar) {
    select(stage.bar, 'xaxis.tickmode', MODES, 'linear', (v) => void mode(v));
    slider(stage.bar, 'tick0', [0, 3, 0.25], 0.5, (v) => {
      state.tick0 = v;
      void relayout(stage.div, { 'xaxis.tick0': v });
    });
    slider(stage.bar, 'dtick', [0.25, 4, 0.25], 0.75, (v) => {
      state.dtick = v;
      void relayout(stage.div, { 'xaxis.dtick': v });
    });
  }
  if (stage.preview) stage.every(1500, (i) => void mode(pick(MODES, i)));
  return () => stage.dispose();
};

export default mount;
