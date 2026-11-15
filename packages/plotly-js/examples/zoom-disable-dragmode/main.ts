// layout.dragmode picks what a drag does; false makes a drag do nothing at all
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { at, normals } from '../../shared/events-kit.ts';
import { select, toggle } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['zoom', 'pan', 'select', 'lasso', 'false'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  let mode: Mode = 'zoom';
  let scroll = false;
  const x = normals(111, 80);
  const y = normals(112, 80);

  const draw = (): Promise<unknown> =>
    Plotly.newPlot(
      stage.div,
      [{ x, y, type: 'scatter', mode: 'markers', marker: { size: 8 } }],
      {
        template: stage.template,
        dragmode: mode === 'false' ? false : mode,
        annotations: [{ text: `dragmode: ${mode}`, xref: 'paper', yref: 'paper', x: 0.02, y: 0.98, xanchor: 'left', yanchor: 'top', showarrow: false, font: { color: '#f59e0b' } }],
      },
      { ...stage.config, scrollZoom: stage.preview ? false : scroll },
    );
  await draw();

  if (stage.bar) {
    select(stage.bar, 'dragmode', MODES, mode, (v) => {
      mode = v;
      void relayout(stage.div, { dragmode: v === 'false' ? false : v, 'annotations[0].text': `dragmode: ${v}` });
    });
    // scrollZoom is config: it only takes effect on a fresh newPlot.
    toggle(stage.bar, 'scrollZoom', scroll, (v) => {
      scroll = v;
      void draw();
    });
  }
  if (stage.preview) {
    stage.every(1000, (i) => {
      const m = at(MODES, i);
      void relayout(stage.div, { dragmode: m === 'false' ? false : m, 'annotations[0].text': `dragmode: ${m}`, 'xaxis.range': i % 2 ? [-3, 3] : [-2, 2] });
    });
  }

  return () => stage.dispose();
};

export default mount;
