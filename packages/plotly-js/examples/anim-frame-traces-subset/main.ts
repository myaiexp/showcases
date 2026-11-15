// A frame's `traces` list limits which traces its data applies to
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const N = 80;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const xs = Array.from({ length: N }, (_, i) => (i / (N - 1)) * 2 * Math.PI);
  // Frame data is matched by position within `traces`: data[0] goes to trace 1.
  const frames = xs.map((t, i) => ({ name: `t${i}`, data: [{ x: [t], y: [Math.sin(t)] }], traces: [1] }));
  const play = { fromcurrent: true, transition: { duration: 0 }, frame: { duration: 35, redraw: false } };

  await Plotly.newPlot(stage.div, {
    data: [
      { x: xs, y: xs.map(Math.sin), mode: 'lines', line: { color: '#60a5fa' }, name: 'sin' },
      { x: [0], y: [0], mode: 'markers', marker: { size: 16, color: '#f59e0b' }, name: 'marker' },
    ],
    layout: {
      template: stage.template,
      showlegend: false,
      xaxis: { range: [0, 2 * Math.PI] },
      yaxis: { range: [-1.3, 1.3] },
      margin: stage.preview ? undefined : { b: 110 },
      updatemenus: stage.preview ? [] : [{ type: 'buttons', showactive: false, direction: 'left', x: 0, y: 0, yanchor: 'top', pad: { t: 70 }, buttons: [{ label: 'Play', method: 'animate', args: [null, play] }, { label: 'Pause', method: 'animate', args: [[null], { mode: 'immediate', transition: { duration: 0 }, frame: { duration: 0, redraw: false } }] }] }],
    } as unknown as Partial<Layout>,
    frames,
    config: stage.config,
  } as never);

  if (stage.preview) {
    const go = (): void => void Plotly.animate(stage.div, null as never, { ...play, fromcurrent: false } as never).catch(() => {});
    go();
    stage.every(N * 35 + 700, go);
  }

  return () => stage.dispose();
};

export default mount;
