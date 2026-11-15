// Named colorscales on a heatmap or a contour: pick one by name
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { json } from '../../shared/data.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const SCALES = ['Blackbody', 'Bluered', 'Earth', 'Electric', 'Greens', 'Greys', 'Hot', 'Jet', 'Picnic', 'Portland', 'RdBu', 'YlGnBu', 'YlOrRd'] as const;
const TYPES = ['heatmap', 'contour'] as const;
type Type = (typeof TYPES)[number];

const mount: Mount = async (el, ctx) => {
  const { z } = await json<{ z: number[][] }>('custom_heatmap_colorscale.json');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });

  await Plotly.newPlot(
    stage.div,
    [{ z, type: 'heatmap', colorscale: 'Jet', colorbar: { thickness: 12 } }],
    { template: stage.template, title: { text: stage.preview ? '' : 'Jet' } },
    stage.config,
  );

  const show = (scale: string, type: Type): void => {
    void Plotly.restyle(stage.div, { colorscale: scale, type } as unknown as Plotly.DataUpdate);
    if (!stage.preview) void Plotly.relayout(stage.div, { 'title.text': `${scale} (${type})` });
  };
  if (stage.bar) {
    let scale: string = 'Jet';
    let type: Type = 'heatmap';
    select(stage.bar, 'colorscale', SCALES, 'Jet', (v) => show((scale = v), type));
    select(stage.bar, 'trace type', TYPES, type, (v) => show(scale, (type = v)));
  } else {
    // The 14 one-colorscale snippets of the docs, one after another.
    stage.every(1100, (i) => show(SCALES[i % SCALES.length]!, 'heatmap'));
  }
  return () => stage.dispose();
};

export default mount;
