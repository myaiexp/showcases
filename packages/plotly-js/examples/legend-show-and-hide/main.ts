// layout.showlegend against trace.showlegend
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { relayout, restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  await Plotly.newPlot(
    stage.div,
    [
      { x: [0, 1, 2], y: [1, 2, 3], name: 'First Trace', showlegend: false, type: 'scatter' },
      { x: [0, 1, 2, 3], y: [8, 4, 2, 0], name: 'Second Trace', showlegend: true, type: 'scatter' },
    ],
    { template: stage.template, showlegend: true },
    stage.config,
  );
  if (stage.bar) {
    toggle(stage.bar, 'layout.showlegend', true, (v) => void relayout(stage.div, { showlegend: v }));
    toggle(stage.bar, 'First Trace showlegend', false, (v) => void restyle(stage.div, { showlegend: v }, [0]));
    toggle(stage.bar, 'Second Trace showlegend', true, (v) => void restyle(stage.div, { showlegend: v }, [1]));
  }
  if (stage.preview) {
    stage.every(1300, (i) => {
      const step = i % 4;
      void relayout(stage.div, { showlegend: step !== 3 });
      void restyle(stage.div, { showlegend: step === 1 || step === 2 }, [0]);
    });
  }
  return () => stage.dispose();
};

export default mount;
