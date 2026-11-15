// plotly_webglcontextlost: the event a WebGL plot raises when its context is taken away
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { normals, output } from '../../shared/events-kit.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const out = output(stage, el);
  const n = 4000;
  const figure = (): Promise<unknown> =>
    Plotly.newPlot(
      stage.div,
      [{ x: normals(21, n), y: normals(22, n), type: 'scattergl', mode: 'markers', marker: { size: 4, opacity: 0.6 } }],
      { template: stage.template },
      stage.config,
    );

  const arm = (): void => {
    stage.div.on('plotly_webglcontextlost', () => out.set('plotly_webglcontextlost fired: the plot lost its WebGL context'));
  };
  await figure();
  arm();
  out.set(stage.preview ? 'scattergl, 4000 points' : 'The plot holds a WebGL context. Lose it with the button.');

  if (stage.bar) {
    button(stage.bar, 'Lose the context', () => {
      const canvas = [...stage.div.querySelectorAll('canvas')].find((c) => c.getContext('webgl2') || c.getContext('webgl'));
      const gl = canvas?.getContext('webgl2') ?? canvas?.getContext('webgl');
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
    });
    button(stage.bar, 'Plot again', () => {
      void figure().then(() => {
        arm();
        out.set('Plotted again with a fresh context.');
      });
    });
  }
  if (stage.preview) {
    stage.every(1200, (i) => void Plotly.restyle(stage.div, { 'marker.color': i % 2 ? '#60a5fa' : '#f472b6' }));
  }

  return () => stage.dispose();
};

export default mount;
