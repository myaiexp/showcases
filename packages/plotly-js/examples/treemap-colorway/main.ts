// treemap colours: layout.treemapcolorway for branches, marker.colors per node
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, relayout, restyle } from '../../shared/basic-util.ts';

const sources = ['default colorway', 'treemapcolorway', 'marker.colors'] as const;
const markerColors = ['pink', 'royalblue', 'lightgray', 'purple', 'cyan', 'lightgray', 'lightblue'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });

  const data: Data[] = [{
    type: 'treemap',
    labels: ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2'],
    parents: ['', 'A1', 'A2', 'A3', 'A4', '', 'B1'],
  }];

  await Plotly.newPlot(stage.div, data, { template: stage.template, margin: stage.preview ? { l: 4, r: 4, t: 4, b: 4 } : { l: 10, r: 10, t: 30, b: 10 } }, stage.config);

  const apply = (s: (typeof sources)[number]): void => {
    void relayout(stage.div, { treemapcolorway: s === 'treemapcolorway' ? ['pink', 'lightgray'] : null });
    void restyle(stage.div, { 'marker.colors': s === 'marker.colors' ? [markerColors] : null });
  };
  if (stage.bar) select(stage.bar, 'Colours from', sources, 'default colorway', apply);
  if (stage.preview) stage.every(1500, (i) => apply(pick(sources, i + 1)));

  return () => stage.dispose();
};

export default mount;
