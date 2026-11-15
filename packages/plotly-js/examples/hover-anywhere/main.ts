// layout.hoveranywhere: hover events over blank space; redraw only when the text changes
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { asEv } from '../../shared/events-kit.ts';
import type { Ev } from '../../shared/events-kit.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const PROMPT = 'Hover anywhere in the plot area';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  let shown = PROMPT;
  const layout = {
    template: stage.template,
    hovermode: 'closest',
    hoveranywhere: true,
    xaxis: { range: [0, 6] },
    yaxis: { range: [0, 6] },
    annotations: [{ text: PROMPT, xref: 'paper', yref: 'paper', x: 0.02, y: 0.98, xanchor: 'left', yanchor: 'top', showarrow: false }],
  } as Partial<Layout>;

  await Plotly.newPlot(
    stage.div,
    [{ x: [1, 2, 3, 4, 5], y: [2, 4, 3, 5, 4], type: 'scatter', mode: 'markers', marker: { size: 14 } }],
    layout,
    stage.config,
  );

  // plotly_hover fires on every cursor move, so redraw only when the text differs.
  const say = (text: string): void => {
    if (text === shown) return;
    shown = text;
    void relayout(stage.div, { 'annotations[0].text': text });
  };
  const hovered = (e: Ev): void => {
    const p = e.points[0];
    say(p ? `Over a point: x = ${p.x}, y = ${p.y}` : `Empty space: x = ${e.xvals?.[0]?.toFixed(2)}, y = ${e.yvals?.[0]?.toFixed(2)}`);
  };
  stage.div.on('plotly_hover', (e) => hovered(asEv(e)));
  stage.div.on('plotly_unhover', () => say(PROMPT));

  if (stage.preview) {
    stage.every(800, (i) => {
      if (i % 4 === 3) say(PROMPT);
      else if (i % 4 === 0) hovered({ points: [{ curveNumber: 0, pointNumber: 1, x: 2, y: 4, data: {} }] });
      else hovered({ points: [], xvals: [0.4 + ((i * 1.9) % 5), 0], yvals: [0.4 + ((i * 2.7) % 5)] });
    });
  }

  return () => stage.dispose();
};

export default mount;
