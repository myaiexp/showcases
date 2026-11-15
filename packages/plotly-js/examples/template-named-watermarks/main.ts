// A layout template with named images: plots using it inherit them, one can be hidden
import Plotly from 'plotly.js';
import type { Template } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { overDark } from '../../shared/chrome-util.ts';
import { createStage } from '../../shared/stage.ts';
import { molecule } from './molecule.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  // The docs fetch two molecule pictures from a personal repo; these are drawn on a canvas
  // (a benzene ring and two fused rings) and passed as data URLs.
  const benzene = molecule(1);
  const naphthalene = molecule(2);

  const baseLayout = {
    title: { text: stage.preview ? '' : 'Watermark Template' },
    // items with a `name` in template.layout.images are added to any plot using the template
    images: [
      { name: 'watermark_1', source: benzene, xref: 'paper', yref: 'paper', x: 0.4, y: 0.9, sizex: 0.7, sizey: 0.7, opacity: 0.25, layer: 'below' },
      { name: 'watermark_2', source: naphthalene, xref: 'paper', yref: 'paper', x: 0.75, y: 0.3, sizex: 0.3, sizey: 0.3, sizing: 'stretch', opacity: 0.45, layer: 'below' },
    ],
    showlegend: false,
  };
  const template = overDark(stage.template, { data: {}, layout: baseLayout } as unknown as Partial<Template>);

  await Plotly.newPlot(
    stage.div,
    [{ x: [0, 1, 2, 3, 4, 5], y: [2, 4, 3, 0, 5, 6], type: 'scatter', mode: 'lines+markers' }],
    { template, images: [{ templateitemname: 'watermark_2', visible: false }] },
    stage.config,
  );
  const second = (on: boolean): Promise<void> => relayout(stage.div, { 'images[0].visible': on });
  if (stage.bar) toggle(stage.bar, "show watermark_2 (images[0].visible)", false, (v) => void second(v));
  if (stage.preview) stage.every(1500, (i) => void second(i % 2 === 1));
  return () => stage.dispose();
};

export default mount;
