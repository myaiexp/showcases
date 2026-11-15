// plotly_relayout is the zoom event: its payload names the axis ranges that changed
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { normals, output, sig } from '../../shared/events-kit.ts';
import { button } from '../../shared/controls.ts';
import { guiRelayout } from '../../shared/fund-util.ts';
import { createStage } from '../../shared/stage.ts';

const N = 40;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const out = output(stage, el);

  await Plotly.newPlot(
    stage.div,
    [{ x: Array.from({ length: N }, (_, i) => i), y: normals(101, N), type: 'scatter' }],
    { template: stage.template, title: stage.preview ? undefined : { text: 'Click-drag to zoom' } },
    stage.config,
  );

  stage.div.on('plotly_relayout', (d) => {
    const e = d as unknown as Record<string, unknown>;
    out.set(
      e['xaxis.autorange']
        ? 'ZOOM reset: xaxis.autorange = true'
        : `ZOOM!  x-axis start: ${sig(e['xaxis.range[0]'])}   x-axis end: ${sig(e['xaxis.range[1]'])}`,
    );
  });

  const ranges = [[5, 20], [22, 36], [10, 14], null] as const;
  const zoom = (i: number): void => {
    const r = ranges[i % ranges.length];
    void guiRelayout(stage.div, r ? { 'xaxis.range': [...r] } : { 'xaxis.autorange': true });
  };
  if (stage.preview) stage.every(1300, zoom);
  if (stage.bar) {
    let i = 0;
    button(stage.bar, 'Zoom to next range', () => zoom(i++));
  }

  return () => stage.dispose();
};

export default mount;
