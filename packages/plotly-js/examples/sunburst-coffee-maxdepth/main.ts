// sunburst with many slices: ids/labels/parents from a CSV, maxdepth, sunburstcolorway
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { pick, relayout, restyle } from '../../shared/basic-util.ts';
import { csv, unpack } from '../../shared/data.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('coffee-flavors.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 560 });

  const data: Data[] = [{
    type: 'sunburst',
    maxdepth: 3,
    ids: unpack(rows, 'ids'),
    labels: unpack(rows, 'labels'),
    parents: unpack(rows, 'parents'),
  }];

  await Plotly.newPlot(
    stage.div,
    data,
    {
      template: stage.template,
      margin: { l: 0, r: 0, b: 0, t: 0 },
      sunburstcolorway: ['#636efa', '#EF553B', '#00cc96', '#ab63fa', '#19d3f3', '#e763fa', '#FECB52', '#FFA15A', '#FF6692', '#B6E880'],
      // Missing from the Layout typings (the typings spell it extendsunburstcolors).
      ...({ extendsunburstcolorway: true } as object),
    },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'maxdepth', [1, 5, 1], 3, (d) => void restyle(stage.div, { maxdepth: d }));
    toggle(stage.bar, 'extendsunburstcolorway', true, (on) => void relayout(stage.div, { extendsunburstcolorway: on }));
  }
  if (stage.preview) stage.every(1600, (i) => void restyle(stage.div, { maxdepth: pick([2, 3, 4, 3], i) }));

  return () => stage.dispose();
};

export default mount;
