// scatter connectgaps over null y values
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { toggle } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });

  // The docs' arrays differ in length (9 y values against 8 x); the extra y is dropped.
  const trace1: Data = { x: [1, 2, 3, 4, 5, 6, 7, 8], y: [10, 15, null, 17, 14, 12, 10, null, 15], mode: 'lines+markers', connectgaps: true };
  const trace2: Data = { x: [1, 2, 3, 4, 5, 6, 7, 8], y: [16, null, 13, 10, 8, null, 11, 12], mode: 'lines', connectgaps: true };

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2],
    { template: stage.template, title: stage.preview ? undefined : { text: 'Connect the Gaps Between Data' }, showlegend: false },
    stage.config,
  );

  if (stage.bar) toggle(stage.bar, 'connectgaps', true, (on) => void restyle(stage.div, { connectgaps: on }));
  if (stage.preview) stage.every(1500, (i) => void restyle(stage.div, { connectgaps: i % 2 === 0 }));

  return () => stage.dispose();
};

export default mount;
