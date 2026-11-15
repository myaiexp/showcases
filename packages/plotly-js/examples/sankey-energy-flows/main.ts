// sankey trace built from node labels/colours and source, target, value link arrays
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider } from '../../shared/controls.ts';
import { relayout, restyle } from '../../shared/basic-util.ts';
import { sankeyArrays } from './energy.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 560 });
  const e = sankeyArrays();

  const trace: Data = {
    type: 'sankey',
    domain: { x: [0, 1], y: [0, 1] },
    orientation: 'h',
    valueformat: '.0f',
    valuesuffix: 'TWh',
    node: { pad: stage.preview ? 8 : 15, thickness: stage.preview ? 10 : 15, line: { color: 'black', width: 0.5 }, label: e.label, color: e.color },
    link: { source: e.source, target: e.target, value: e.value, label: e.linkLabel },
  };

  await Plotly.newPlot(
    stage.div,
    [trace],
    {
      template: stage.template,
      title: stage.preview ? undefined : { text: 'Energy flows, TWh<br><sup>Illustrative figures generated for this gallery</sup>' },
      font: { size: stage.preview ? 8 : 11 },
    },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'Style', ['dark', 'light'], 'dark', (s) => {
      const light = s === 'light';
      stage.div.style.background = light ? '#f4f4f5' : '';
      void relayout(stage.div, { 'font.color': light ? '#18181b' : '#e6e8ee' });
    });
    slider(stage.bar, 'node.pad', [2, 40, 1], 15, (v) => void restyle(stage.div, { 'node.pad': v }));
    slider(stage.bar, 'node.thickness', [5, 40, 1], 15, (v) => void restyle(stage.div, { 'node.thickness': v }));
  }
  // The card swells the wind and solar links and shrinks gas, and the diagram rebalances.
  if (stage.preview) stage.every(120, (i) => {
    const k = Math.sin(i / 9);
    void restyle(stage.div, {
      'link.value': [e.value.map((v, j) => (j === 6 || j === 7 ? v * (1.6 + 0.8 * k) : j === 1 ? v * (1 - 0.4 * k) : v))],
    });
  });

  return () => stage.dispose();
};

export default mount;
