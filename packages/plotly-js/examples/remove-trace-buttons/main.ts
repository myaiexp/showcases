// Plotly.deleteTraces by index, with the removed traces kept so Restore can add them back
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const ORIGINAL = (): Data[] => [
  { x: [1, 2, 3, 4], y: [10, 15, 13, 17], type: 'scatter', line: { color: 'rgb(55, 128, 191)' } },
  { x: [1, 2, 3, 4], y: [16, 5, 11, 9], type: 'scatter', line: { color: 'rgb(255,140,0)' } },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 360 });
  const log = stage.preview ? null : readout(el);
  const say = (): void => {
    if (log) log.textContent = `${stage.div.data.length} trace(s) in the graph`;
  };

  await Plotly.newPlot(
    stage.div,
    ORIGINAL(),
    { template: stage.template, showlegend: false, title: stage.preview ? undefined : { text: 'Click Buttons to Delete Traces' }, yaxis: { range: [0, 20] } },
    stage.config,
  );
  say();

  const remove = async (index: number): Promise<void> => {
    if (!stage.div.data.length) return;
    await Plotly.deleteTraces(stage.div, index);
    say();
  };
  const restore = async (): Promise<void> => {
    await Plotly.deleteTraces(stage.div, [...stage.div.data.keys()]).catch(() => {});
    await Plotly.addTraces(stage.div, ORIGINAL());
    say();
  };
  if (stage.bar) {
    button(stage.bar, 'Delete first trace', () => void remove(0));
    button(stage.bar, 'Delete last trace', () => void remove(stage.div.data.length - 1));
    button(stage.bar, 'Restore both', () => void restore());
  }
  if (stage.preview) {
    stage.every(1200, (i) => {
      const step = i % 4;
      if (step === 1) void remove(0);
      else if (step === 2) void remove(0);
      else if (step === 0) void restore();
    });
  }

  return () => stage.dispose();
};

export default mount;
