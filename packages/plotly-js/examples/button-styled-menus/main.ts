// Styling an updatemenu: bgcolor, bordercolor, borderwidth, font, pad and the active button
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { applyButton, at, mtBruno } from '../../shared/events-kit.ts';
import type { Btn } from '../../shared/events-kit.ts';
import { createStage } from '../../shared/stage.ts';

const r = (args: unknown[], label: string): Btn => ({ method: 'restyle', args, label });
const types = [r(['type', 'heatmap'], 'Heatmap'), r(['type', 'contour'], 'Contour')];
const reverse = [r(['reversescale', true], 'Reverse'), r(['reversescale', false], 'Undo Reverse')];
const scales = ['Viridis', 'Electric', 'Earth', 'Hot', 'Jet'].map((s) => r(['colorscale', s], s));

const mount: Mount = async (el, ctx) => {
  const z = await mtBruno();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });
  const look = { bgcolor: '#1e3a5f', bordercolor: '#5072a8', borderwidth: 2, font: { color: '#cfe0ff', size: 13 }, pad: { r: 10, t: 10 }, showactive: true, y: 1.15, yanchor: 'top' };

  await Plotly.newPlot(
    stage.div,
    [{ z, type: 'heatmap', colorscale: 'Viridis', showscale: !stage.preview }],
    {
      template: stage.template,
      margin: stage.preview ? undefined : { t: 100 },
      updatemenus: stage.preview
        ? []
        : [
            { ...look, buttons: types, direction: 'left', type: 'buttons', x: 0.05, xanchor: 'left' },
            { ...look, buttons: reverse, direction: 'down', type: 'dropdown', x: 0.45, xanchor: 'left', active: 1 },
            { ...look, buttons: scales, direction: 'down', type: 'dropdown', x: 0.7, xanchor: 'left', bgcolor: '#5b2a4a', bordercolor: '#f472b6' },
          ],
    } as unknown as Partial<Layout>,
    stage.config,
  );

  if (stage.preview) {
    stage.every(1200, (i) => {
      void applyButton(stage.div, at(types, i));
      void applyButton(stage.div, at(scales, i));
    });
  }

  return () => stage.dispose();
};

export default mount;
