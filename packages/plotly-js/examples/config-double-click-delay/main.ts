// config.doubleClickDelay: how slow two clicks may be and still count as a double click
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { readout, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 360 });
  const out = stage.preview ? null : readout(el);
  const state = { delay: 1000, doubles: 0 };

  const draw = async (): Promise<void> => {
    await Plotly.newPlot(
      stage.div,
      [{ type: 'bar', y: [3, 5, 3, 2], x: ['2019-09-02', '2019-10-10', '2019-11-12', '2019-12-22'], marker: { color: '#22d3ee' } }],
      { template: stage.template, xaxis: { type: 'date' }, title: { text: stage.preview ? '' : 'Double-click the plot to reset the zoom' } },
      { ...stage.config, doubleClickDelay: state.delay },
    );
    // plotly_doubleclick fires on a double click that passed the delay test.
    stage.div.on('plotly_doubleclick', () => {
      state.doubles++;
      if (out) out.textContent = `doubleClickDelay ${state.delay} ms, double clicks seen: ${state.doubles}`;
    });
    if (out) out.textContent = `doubleClickDelay ${state.delay} ms, double clicks seen: ${state.doubles}`;
  };
  await draw();

  if (stage.bar) {
    slider(stage.bar, 'doubleClickDelay (ms)', [100, 2000, 100], state.delay, (v) => {
      state.delay = v;
      void draw();
    });
  }
  // The card stands in for the reader's second click, which it cannot make.
  if (stage.preview) {
    stage.every(1500, (i) => void Plotly.relayout(stage.div, { 'yaxis.range': i % 2 ? [0, 6] : [1.5, 5.5] }));
  }
  return () => {
    out?.remove();
    stage.dispose();
  };
};

export default mount;
