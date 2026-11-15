// sunburst textposition inside + insidetextorientation
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { csv, unpack } from '../../shared/data.ts';

const orientations = ['radial', 'horizontal', 'tangential', 'auto'] as const;

const mount: Mount = async (el, ctx) => {
  const rows = await csv('coffee-flavors.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 520 });

  const data: Data[] = [{
    type: 'sunburst',
    maxdepth: 2,
    ids: unpack(rows, 'ids'),
    labels: unpack(rows, 'labels'),
    parents: unpack(rows, 'parents'),
    // textposition is documented for sunburst but missing from the SunburstData typings.
    ...({ textposition: 'inside' } as object),
    insidetextorientation: 'radial',
  }];

  await Plotly.newPlot(stage.div, data, { template: stage.template, margin: { l: 0, r: 0, b: 0, t: 0 } }, stage.config);

  if (stage.bar) select(stage.bar, 'insidetextorientation', orientations, 'radial', (o) => void restyle(stage.div, { insidetextorientation: o }));
  if (stage.preview) stage.every(1500, (i) => {
    const o = pick(orientations, i);
    void restyle(stage.div, { insidetextorientation: o });
  });

  return () => stage.dispose();
};

export default mount;
