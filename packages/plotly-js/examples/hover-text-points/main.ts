// A text array on a scatter trace: one hover label per marker
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  await Plotly.newPlot(
    stage.div,
    [{ x: [0, 0.5, 1, 1.5, 2], y: [1, 3, 2, 4, 2], mode: 'markers', marker: { size: 16 }, text: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'], type: 'scatter' }],
    { template: stage.template, title: { text: stage.preview ? '' : 'Hover over the points to see the text' } },
    stage.config,
  );
  // A card has no pointer, so it hovers each point in turn.
  if (stage.preview) stage.every(900, (i) => Fx.hover(stage.div, { curveNumber: 0, pointNumber: i % 5 }));
  return () => stage.dispose();
};

export default mount;
