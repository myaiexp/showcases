// the same cloud as trace type scatter (SVG) and scattergl (WebGL), timed through Plotly.react
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider, readout } from '../../shared/controls.ts';
import { pick } from '../../shared/basic-util.ts';
import { cloud } from '../../shared/gl-data.ts';

type Kind = 'scatter' | 'scattergl';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const info = stage.preview ? null : readout(el);

  let last = '';
  const draw = async (type: Kind, n: number): Promise<void> => {
    const { x, y } = cloud(n, 7);
    const trace: Data = { type, mode: 'markers', x: x as unknown as number[], y: y as unknown as number[], marker: { size: 5, opacity: 0.6 } };
    // Plotly.react resolves once the trace is drawn, so the time is the cost of the render.
    const t0 = performance.now();
    await Plotly.react(
      stage.div,
      [trace],
      { template: stage.template, title: { text: `${type}: ${n.toLocaleString('en-US')} points`, font: { size: stage.preview ? 11 : 16 } }, margin: stage.preview ? { l: 30, r: 10, t: 30, b: 24 } : undefined },
      stage.config,
    );
    last = `${type}, ${n.toLocaleString('en-US')} points: ${Math.round(performance.now() - t0)} ms to draw`;
    if (info) info.textContent = last;
  };

  const counts = stage.preview ? 3000 : 5000;
  await draw('scatter', counts);

  if (stage.bar) {
    let type: Kind = 'scatter';
    let n = counts;
    select(stage.bar, 'Trace type', ['scatter', 'scattergl'] as const, 'scatter', (t) => void draw((type = t), n));
    slider(stage.bar, 'Points', [500, 30000, 500], counts, (v) => void draw(type, (n = v)));
  }
  if (stage.preview) {
    let busy = false;
    stage.every(2000, (i) => {
      if (busy) return;
      busy = true;
      void draw(pick<Kind>(['scattergl', 'scatter'], i - 1), counts).finally(() => (busy = false));
    });
  }

  return () => stage.dispose();
};

export default mount;
