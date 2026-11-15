// plotly_selected hands the lassoed points to restyle, which feeds two histograms
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { asEv } from '../../shared/events-kit.ts';
import { rng } from '../../shared/stat-data.ts';
import { restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const N = 1000;
const C1 = '#7b3294';
const C1_LIGHT = '#c2a5cf';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const rand = rng(141);
  const x = Array.from({ length: N }, () => rand());
  const y = Array.from({ length: N }, () => rand());

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'scatter', mode: 'markers', x, y, xaxis: 'x', yaxis: 'y', name: 'random data', marker: { color: '#a78bfa', size: stage.preview ? 5 : 8 } },
      { type: 'histogram', x, xaxis: 'x2', yaxis: 'y2', name: 'x coord dist.', marker: { color: '#ffa7b5' } },
      { type: 'histogram', x: y, xaxis: 'x3', yaxis: 'y3', name: 'y coord dist.', marker: { color: '#fdae61' } },
    ],
    {
      template: stage.template,
      showlegend: false,
      title: stage.preview ? undefined : { text: 'Lasso around the scatter points to see sub-distributions' },
      dragmode: 'lasso',
      xaxis: { zeroline: false },
      yaxis: { domain: [0.55, 1] },
      xaxis2: { domain: [0, 0.45], anchor: 'y2' },
      yaxis2: { domain: [0, 0.45], anchor: 'x2' },
      xaxis3: { domain: [0.55, 1], anchor: 'y3' },
      yaxis3: { domain: [0, 0.45], anchor: 'x3' },
    } as Partial<Layout>,
    stage.config,
  );

  const select = (pts: { x: number; y: number; pointNumber: number }[]): void => {
    const colors = Array.from({ length: N }, () => C1_LIGHT);
    for (const p of pts) colors[p.pointNumber] = C1;
    void restyle(stage.div, { x: [pts.map((p) => p.x), pts.map((p) => p.y)], xbins: {} }, [1, 2]);
    void restyle(stage.div, { 'marker.color': [colors] }, [0]);
  };
  stage.div.on('plotly_selected', (e) => {
    const pts = asEv(e)?.points;
    if (pts) select(pts.map((p) => ({ x: Number(p.x), y: Number(p.y), pointNumber: p.pointNumber })));
  });

  // Cards: a region sweeps across the cloud; the handler gets the points inside it.
  if (stage.preview) {
    stage.every(1000, (i) => {
      const cx = 0.5 + 0.35 * Math.sin(i * 0.8);
      const cy = 0.5 + 0.35 * Math.cos(i * 0.6);
      const hit = x.map((_, k) => k).filter((k) => (x[k]! - cx) ** 2 + (y[k]! - cy) ** 2 < 0.045);
      select(hit.map((k) => ({ x: x[k]!, y: y[k]!, pointNumber: k })));
    });
  }

  return () => stage.dispose();
};

export default mount;
