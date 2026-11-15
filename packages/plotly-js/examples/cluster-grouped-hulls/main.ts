// Three clusters, each a marker trace and an alphahull mesh sharing a legendgroup
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpackNum } from '../../shared/data.ts';
import { slider } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';
import { gauss, rng } from '../../shared/stat-data.ts';

const COLORS = ['#60a5fa', '#f59e0b', '#34d399'];

const mount: Mount = async (el, ctx) => {
  const rows = await csv('normal-clusters.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 520 });
  // The CSV is two-dimensional; the third coordinate is seeded noise around a height per cluster.
  const noise = gauss(rng(21));
  const data: Data[] = [];
  [0, 1, 2].forEach((c) => {
    const x = unpackNum(rows, `x${c}`);
    const y = unpackNum(rows, `y${c}`);
    const z = x.map(() => c * 2 + noise() * 0.8);
    const group = { legendgroup: `cluster ${c + 1}`, x, y, z } as const;
    data.push({ ...group, type: 'scatter3d', mode: 'markers', name: `cluster ${c + 1}`, marker: { size: 2.5, color: COLORS[c]! } });
    data.push({ ...group, type: 'mesh3d', alphahull: 6, opacity: 0.18, color: COLORS[c]!, showlegend: false, hoverinfo: 'skip' });
  });

  await Plotly.newPlot(
    stage.div,
    data,
    { template: stage.template, margin: margin3d(stage), showlegend: !stage.preview, scene: { aspectmode: 'data', camera: { eye: { x: 1.6, y: 1.6, z: 0.8 } } } },
    stage.config,
  );

  if (stage.bar) slider(stage.bar, 'mesh opacity', [0, 0.6, 0.02], 0.18, (v) => void restyle(stage.div, { opacity: v }, [1, 3, 5]));
  orbit(stage, { radius: 2.5 });
  return () => stage.dispose();
};

export default mount;
