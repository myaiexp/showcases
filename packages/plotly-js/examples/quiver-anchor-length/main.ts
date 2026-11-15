// A rotational field on a grid: where each arrow sits on its point and how its length is scaled
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const anchors = ['tail', 'center', 'tip'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const x: number[] = [];
  const y: number[] = [];
  const u: number[] = [];
  const v: number[] = [];
  for (let i = -2; i <= 2; i += 1) {
    for (let j = -2; j <= 2; j += 1) {
      x.push(i);
      y.push(j);
      u.push(-j);
      v.push(i);
    }
  }

  // The field (u, v) = (-y, x) turns about the origin; anchor 'center' puts each arrow's midpoint on its grid point.
  await Plotly.newPlot(
    stage.div,
    [
      { type: 'scatter', mode: 'markers', x, y, marker: { size: 4, color: '#6b7280' }, hoverinfo: 'skip', showlegend: false },
      { type: 'quiver', x, y, u, v, anchor: 'center', lengthfactor: 0.8, marker: { color: '#636efa' } },
    ],
    { template: stage.template, xaxis: { title: { text: 'x' } }, yaxis: { title: { text: 'y' }, scaleanchor: 'x' } },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'anchor', anchors, 'center', (a) => void restyle(stage.div, { anchor: a }, [1]));
    select(stage.bar, 'lengthmode', ['scaled', 'raw'] as const, 'scaled', (m) => void restyle(stage.div, { lengthmode: m }, [1]));
    slider(stage.bar, 'lengthfactor', [0.2, 2, 0.1], 0.8, (f) => void restyle(stage.div, { lengthfactor: f }, [1]));
  } else {
    stage.every(120, (i) => void restyle(stage.div, { anchor: pick(anchors, Math.floor(i / 12)), lengthfactor: 0.8 + 0.4 * Math.sin(i / 5) }, [1]));
  }

  return () => stage.dispose();
};

export default mount;
