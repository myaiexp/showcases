// restyle buttons: a single attribute (args: [attr, value]) and several at once (args: [{...}])
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { applyButton, at, mtBruno } from '../../shared/events-kit.ts';
import type { Btn } from '../../shared/events-kit.ts';
import { createStage } from '../../shared/stage.ts';

const r = (args: unknown[], label: string): Btn => ({ method: 'restyle', args, label });
const types = [r(['type', 'surface'], '3D Surface'), r(['type', 'heatmap'], 'Heatmap'), r(['type', 'contour'], 'Contour')];
const reverse = [r(['reversescale', true], 'Reverse'), r(['reversescale', false], 'Undo Reverse')];
const lines = [r([{ 'contours.showlines': false, type: 'contour' }], 'Hide lines'), r([{ 'contours.showlines': true, type: 'contour' }], 'Show lines')];
const scales = ['Viridis', 'Electric', 'Earth', 'Hot', 'Jet'].map((s) => r(['colorscale', s], s));

const mount: Mount = async (el, ctx) => {
  const z = await mtBruno();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 560 });
  const menu = (buttons: Btn[], x: number, type: 'buttons' | 'dropdown'): object => ({
    buttons,
    direction: type === 'buttons' ? 'left' : 'down',
    pad: { r: 10, t: 10 },
    showactive: true,
    type,
    x,
    xanchor: 'left',
    y: 1.0,
    yanchor: 'top',
  });

  await Plotly.newPlot(
    stage.div,
    [{ z, type: 'surface', colorscale: 'Viridis', showscale: !stage.preview }],
    {
      template: stage.template,
      margin: stage.preview ? { l: 0, r: 0, t: 0, b: 0 } : { l: 0, r: 0, t: 0, b: 0 },
      updatemenus: stage.preview ? [] : [menu(types, 0.02, 'buttons'), menu(reverse, 0.4, 'dropdown'), menu(lines, 0.55, 'dropdown'), menu(scales, 0.72, 'dropdown')],
      scene: { aspectratio: { x: 1, y: 1, z: 0.7 }, aspectmode: 'manual', camera: { eye: { x: 1.5, y: 1.5, z: 0.9 } } },
    } as unknown as Partial<Layout>,
    stage.config,
  );

  // Cards: the same buttons' args, applied in turn.
  if (stage.preview) {
    stage.every(1300, (i) => {
      void applyButton(stage.div, at(types, i));
      void applyButton(stage.div, at(scales, i));
    });
  }

  return () => stage.dispose();
};

export default mount;
