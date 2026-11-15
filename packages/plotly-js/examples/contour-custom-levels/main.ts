// Contour levels set by hand: autocontour off with start, end and size, or ncontours
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { basicZ } from '../../shared/sci-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  const state = { start: 0, end: 8, size: 2 };

  await Plotly.newPlot(
    stage.div,
    [
      {
        z: basicZ,
        type: 'contour',
        colorscale: 'Jet',
        autocontour: false,
        contours: { start: state.start, end: state.end, size: state.size },
      },
    ],
    { template: stage.template, title: { text: stage.preview ? '' : 'Customizing size and range of contours' } },
    stage.config,
  );

  if (stage.bar) {
    const push = (): void => void restyle(stage.div, { 'contours.start': state.start, 'contours.end': state.end, 'contours.size': state.size });
    slider(stage.bar, 'start', [0, 10, 0.5], state.start, (v) => ((state.start = v), push()));
    slider(stage.bar, 'end', [4, 20, 0.5], state.end, (v) => ((state.end = v), push()));
    slider(stage.bar, 'size', [0.5, 5, 0.5], state.size, (v) => ((state.size = v), push()));
    // autocontour back on hands the choice to Plotly, which then follows ncontours.
    select(stage.bar, 'levels', ['manual', 'autocontour'] as const, 'manual', (v) => void restyle(stage.div, { autocontour: v === 'autocontour', ncontours: 12 }));
  } else {
    stage.every(500, (i) => {
      const size = [0.5, 1, 2, 4][i % 4] ?? 2;
      void restyle(stage.div, { 'contours.size': size, 'contours.end': 4 + (i % 3) * 6 });
    });
  }

  return () => stage.dispose();
};

export default mount;
