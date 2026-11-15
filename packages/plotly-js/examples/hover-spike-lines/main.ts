// showspikes, spikemode, spikesnap and spikedash: guide lines under the hover point
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['toaxis', 'across', 'marker', 'toaxis+across', 'toaxis+marker', 'across+marker'] as const;
const SNAPS = ['data', 'cursor', 'hovered data'] as const;
const DASHES = ['dash', 'solid', 'dot', 'longdash'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = Array.from({ length: 24 }, (_, i) => i);

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: x.map((v) => Math.sin(v / 3) * 4 + 6), mode: 'lines+markers', name: 'sine' },
      { x, y: x.map((v) => v / 3), mode: 'lines+markers', name: 'ramp' },
    ],
    {
      template: stage.template,
      hovermode: 'closest',
      showlegend: false,
      xaxis: { showspikes: true, spikemode: 'toaxis+across', spikesnap: 'data', spikedash: 'dash', spikethickness: 1, spikecolor: '#f59e0b' },
      yaxis: { showspikes: true, spikemode: 'toaxis', spikesnap: 'data', spikedash: 'dash', spikethickness: 1, spikecolor: '#f59e0b' },
    },
    stage.config,
  );
  if (stage.bar) {
    toggle(stage.bar, 'showspikes', true, (v) => void relayout(stage.div, { 'xaxis.showspikes': v, 'yaxis.showspikes': v }));
    select(stage.bar, 'spikemode', MODES, 'toaxis+across', (v) => void relayout(stage.div, { 'xaxis.spikemode': v, 'yaxis.spikemode': v }));
    select(stage.bar, 'spikesnap', SNAPS, 'data', (v) => void relayout(stage.div, { 'xaxis.spikesnap': v, 'yaxis.spikesnap': v }));
    select(stage.bar, 'spikedash', DASHES, 'dash', (v) => void relayout(stage.div, { 'xaxis.spikedash': v, 'yaxis.spikedash': v }));
  }
  if (stage.preview) stage.every(800, (i) => Fx.hover(stage.div, { curveNumber: i % 2, pointNumber: (i * 5) % x.length }));
  return () => stage.dispose();
};

export default mount;
