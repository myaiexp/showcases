// A colorscale written as [position, colour] stops, on a heatmap and on a contour
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { json } from '../../shared/data.ts';
import { select, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// Ten evenly spaced RdYlBu stops, the heatmap's custom scale in the docs.
const HEAT: [number, string][] = [
  [0, 'rgb(165,0,38)'], [1 / 9, 'rgb(215,48,39)'], [2 / 9, 'rgb(244,109,67)'], [3 / 9, 'rgb(253,174,97)'], [4 / 9, 'rgb(254,224,144)'],
  [5 / 9, 'rgb(224,243,248)'], [6 / 9, 'rgb(171,217,233)'], [7 / 9, 'rgb(116,173,209)'], [8 / 9, 'rgb(69,117,180)'], [1, 'rgb(49,54,149)'],
];
// Six unevenly spaced stops, the docs' contour scale: positions need not be even.
const CONTOUR: [number, string][] = [
  [0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(178,223,138)'], [0.65, 'rgb(51,160,44)'], [0.85, 'rgb(251,154,153)'], [1, 'rgb(227,26,28)'],
];
const SMALL = [[10, 10.625, 12.5, 15.625, 20], [5.625, 6.25, 8.125, 11.25, 15.625], [2.5, 3.125, 5, 8.125, 12.5], [0.625, 1.25, 3.125, 6.25, 10.625], [0, 0.625, 2.5, 5.625, 10]];

const KINDS = ['heatmap, ten stops', 'contour, six stops'] as const;
type Kind = (typeof KINDS)[number];

const mount: Mount = async (el, ctx) => {
  const { z } = await json<{ z: number[][] }>('custom_heatmap_colorscale.json');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });

  const draw = (kind: Kind, reversescale: boolean): Promise<unknown> =>
    Plotly.newPlot(
      stage.div,
      [kind === KINDS[0] ? { type: 'heatmap', z, colorscale: HEAT, reversescale } : { type: 'contour', z: SMALL, colorscale: CONTOUR, reversescale }],
      { template: stage.template, title: { text: stage.preview ? '' : `Custom colorscale: ${kind}` } },
      stage.config,
    );
  await draw(KINDS[0], false);

  if (stage.bar) {
    let kind: Kind = KINDS[0];
    let rev = false;
    select(stage.bar, 'trace', KINDS, kind, (v) => void draw((kind = v), rev));
    toggle(stage.bar, 'reversescale', false, (v) => void draw(kind, (rev = v)));
  } else {
    stage.every(1600, (i) => void draw(KINDS[Math.floor(i / 2) % 2]!, i % 2 === 1));
  }
  return () => stage.dispose();
};

export default mount;
