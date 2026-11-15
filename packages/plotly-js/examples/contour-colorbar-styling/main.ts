// A contour colorbar: thickness, length, title and tick styling set from controls
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { basicZ } from '../../shared/sci-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        z: basicZ,
        type: 'contour',
        colorbar: {
          thickness: 30,
          thicknessmode: 'pixels',
          len: 0.9,
          lenmode: 'fraction',
          outlinewidth: 0,
          title: { text: 'Color Bar Title', side: 'right', font: { size: 14 } },
          ticks: 'outside',
          dtick: 2,
          tickwidth: 2,
          ticklen: 8,
          tickcolor: 'grey',
          tickfont: { size: stage.preview ? 10 : 14 },
        },
      },
    ],
    { template: stage.template },
    stage.config,
  );

  const set = (path: string, v: unknown): void => void restyle(stage.div, { [path]: v });
  if (stage.bar) {
    slider(stage.bar, 'thickness (px)', [5, 100, 1], 30, (v) => set('colorbar.thickness', v));
    slider(stage.bar, 'len', [0.2, 1, 0.05], 0.9, (v) => set('colorbar.len', v));
    slider(stage.bar, 'dtick', [0.5, 5, 0.5], 2, (v) => set('colorbar.dtick', v));
    slider(stage.bar, 'ticklen', [0, 20, 1], 8, (v) => set('colorbar.ticklen', v));
    toggle(stage.bar, 'title', true, (v) => set('colorbar.title.text', v ? 'Color Bar Title' : ''));
    toggle(stage.bar, 'showticklabels', true, (v) => set('colorbar.showticklabels', v));
  } else {
    // Cards: the bar swells and shrinks.
    stage.every(120, (i) => {
      const t = 0.5 + 0.5 * Math.sin(i / 6);
      void restyle(stage.div, { 'colorbar.thickness': 8 + 40 * t, 'colorbar.len': 0.5 + 0.45 * t });
    });
  }

  return () => stage.dispose();
};

export default mount;
