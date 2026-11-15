// A quiver trace of six arrows, each anchored at (x, y) and pointing along (u, v)
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const u = [1, 0.5, 0, 0.5, 0, -0.5];
  const v = [0, 0.5, 1, 0.5, 1, 0.5];

  await Plotly.newPlot(
    stage.div,
    [{ type: 'quiver', x: [0, 1, 2, 0, 1, 2], y: [0, 0, 0, 1, 1, 1], u, v }],
    { template: stage.template, title: { text: stage.preview ? '' : 'Basic quiver plot' }, xaxis: { title: { text: 'x' }, range: [-0.5, 3] }, yaxis: { title: { text: 'y' }, range: [-0.5, 2] } },
    stage.config,
  );

  // Rotate every vector by the same angle: (u, v) is a free parameter of each arrow.
  const spin = (deg: number): void => {
    const c = Math.cos((deg * Math.PI) / 180);
    const s = Math.sin((deg * Math.PI) / 180);
    void restyle(stage.div, { u: [u.map((a, i) => a * c - (v[i] ?? 0) * s)], v: [u.map((a, i) => a * s + (v[i] ?? 0) * c)] }, [0]);
  };
  if (stage.bar) {
    let n = 0;
    button(stage.bar, 'Rotate vectors 30°', () => spin(++n * 30));
  } else stage.every(80, (i) => spin(i * 6));

  return () => stage.dispose();
};

export default mount;
