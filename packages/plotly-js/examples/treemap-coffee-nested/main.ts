// treemap ids/labels/parents from a CSV, tiling.packing, maxdepth and the pathbar
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { csv, unpack } from '../../shared/data.ts';

const packings = ['squarify', 'binary', 'dice', 'slice', 'slice-dice', 'dice-slice'];

const mount: Mount = async (el, ctx) => {
  const rows = await csv('coffee-flavors.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 520 });

  const data: Data[] = [{
    type: 'treemap',
    ids: unpack(rows, 'ids'),
    labels: unpack(rows, 'labels'),
    parents: unpack(rows, 'parents'),
    tiling: { packing: 'squarify' },
  }];

  await Plotly.newPlot(stage.div, data, { template: stage.template, margin: stage.preview ? { l: 4, r: 4, t: 4, b: 4 } : { l: 10, r: 10, t: 30, b: 10 } }, stage.config);

  if (stage.bar) {
    select(stage.bar, 'tiling.packing', packings, 'squarify', (p) => void restyle(stage.div, { 'tiling.packing': p }));
    slider(stage.bar, 'maxdepth (-1 = all)', [-1, 4, 1], -1, (d) => void restyle(stage.div, { maxdepth: d }));
    toggle(stage.bar, 'pathbar.visible', true, (on) => void restyle(stage.div, { 'pathbar.visible': on }));
  }
  if (stage.preview) stage.every(1500, (i) => void restyle(stage.div, { 'tiling.packing': pick(packings, i) }));

  return () => stage.dispose();
};

export default mount;
