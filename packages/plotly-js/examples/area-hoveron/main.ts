// scatter hoveron: points, fills, points+fills on a toself polygon
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';
import { Fx } from '../../shared/fx.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  const data: Data[] = [
    { x: [0, 0.5, 1, 1.5, 2], y: [0, 1, 2, 1, 0], fill: 'toself', fillcolor: '#ab63fa', hoveron: 'points+fills', line: { color: '#ab63fa' }, text: 'Points + Fills', hoverinfo: 'text' },
    { x: [3, 3.5, 4, 4.5, 5], y: [0, 1, 2, 1, 0], fill: 'toself', fillcolor: '#e763fa', hoveron: 'points', line: { color: '#e763fa' }, text: 'Points only', hoverinfo: 'text' },
  ];

  await Plotly.newPlot(
    stage.div,
    data,
    {
      template: stage.template,
      title: stage.preview ? undefined : { text: 'Hover on <i>points</i> or <i>fill</i>' },
      xaxis: { range: [0, 5] },
      yaxis: { range: [0, 3] },
      showlegend: false,
    },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'Left polygon hoveron', ['points+fills', 'points', 'fills'], 'points+fills', (h) => void restyle(stage.div, { hoveron: h }, [0]));
    select(stage.bar, 'Right polygon hoveron', ['points', 'fills', 'points+fills'], 'points', (h) => void restyle(stage.div, { hoveron: h }, [1]));
  }
  if (stage.preview) stage.every(900, (i) => Fx.hover(stage.div, { curveNumber: i % 2, pointNumber: 1 + (Math.floor(i / 2) % 3) }));

  return () => stage.dispose();
};

export default mount;
