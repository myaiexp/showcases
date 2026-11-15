// method 'animate' buttons: [null, opts] plays every frame, [[null], opts] stops
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const N = 90;
const path = (t: number): [number, number] => [Math.sin(3 * t * 2 * Math.PI), Math.sin(2 * t * 2 * Math.PI)];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  const pts = Array.from({ length: N }, (_, i) => path(i / (N - 1)));
  const frames = pts.map((p, i) => ({
    name: `f${i}`,
    data: [{ x: pts.slice(0, i + 1).map((q) => q[0]), y: pts.slice(0, i + 1).map((q) => q[1]) }, { x: [p[0]], y: [p[1]] }],
  }));
  const play = { fromcurrent: true, transition: { duration: 0 }, frame: { duration: 40, redraw: false } };
  const pause = { mode: 'immediate', transition: { duration: 0 }, frame: { duration: 0, redraw: false } };

  await Plotly.newPlot(stage.div, {
    data: [
      { x: [pts[0]![0]], y: [pts[0]![1]], mode: 'lines', line: { color: '#60a5fa', simplify: false } },
      { x: [pts[0]![0]], y: [pts[0]![1]], mode: 'markers', marker: { size: 14, color: '#f59e0b' } },
    ],
    layout: {
      template: stage.template,
      showlegend: false,
      xaxis: { range: [-1.2, 1.2], zeroline: false },
      yaxis: { range: [-1.2, 1.2], zeroline: false, scaleanchor: 'x' },
      updatemenus: stage.preview
        ? []
        : [{ type: 'buttons', showactive: false, direction: 'left', x: 0.1, y: 0, xanchor: 'right', yanchor: 'top', pad: { t: 60, r: 10 }, buttons: [{ method: 'animate', args: [null, play], label: 'Play' }, { method: 'animate', args: [[null], pause], label: 'Pause' }] }],
    } as unknown as Partial<Layout>,
    frames,
    config: stage.config,
  } as never);

  // Cards press Play themselves, and again once a pass has finished.
  if (stage.preview) {
    const go = (): void => void Plotly.animate(stage.div, null as never, { ...play, fromcurrent: false } as never).catch(() => {});
    go();
    stage.every(N * 40 + 600, go);
  }

  return () => stage.dispose();
};

export default mount;
