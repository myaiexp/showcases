// config.scrollZoom: zoom with the mouse wheel or a two-finger scroll
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const draw = (scrollZoom: boolean): Promise<unknown> =>
    Plotly.newPlot(
      stage.div,
      [{ type: 'scatter', x: ['2020-10-04', '2021-11-04', '2023-12-04'], y: [90, 40, 60], line: { color: '#fb7185' } }],
      { template: stage.template, title: { text: stage.preview ? '' : 'Scroll over the plot to zoom' }, showlegend: false },
      { ...stage.config, scrollZoom },
    );
  await draw(true);

  if (stage.bar) toggle(stage.bar, 'scrollZoom', true, (v) => void draw(v));
  // A wheel turn zooms around the pointer; the card zooms in and out by hand.
  if (stage.preview) {
    stage.every(120, (i) => {
      const k = 0.5 + 0.5 * Math.cos(i / 8);
      const t0 = Date.parse('2020-10-04');
      const t1 = Date.parse('2023-12-04');
      const mid = t0 + (t1 - t0) * 0.35;
      void Plotly.relayout(stage.div, { 'xaxis.range': [new Date(mid - (mid - t0) * (0.2 + 0.8 * k)).toISOString(), new Date(mid + (t1 - mid) * (0.2 + 0.8 * k)).toISOString()] });
    });
  }
  return () => stage.dispose();
};

export default mount;
