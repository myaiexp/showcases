// scene axis titles: a title and its font on each of the three axes
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { randoms } from '../../shared/fund-util.ts';
import { rng } from '../../shared/stat-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const r = rng(55);
  const mesh = (color: string): Plotly.Data => ({ type: 'mesh3d', x: randoms(r, 300, 200), y: randoms(r, 300, 300), z: randoms(r, 300, 150), color });
  await Plotly.newPlot(
    stage.div,
    [mesh('lightblue'), mesh('pink')],
    {
      template: stage.template,
      margin: { l: 0, r: 0, t: 0, b: stage.preview ? 0 : 40 },
      scene: {
        xaxis: { title: { text: 'X AXIS TITLE', font: { size: 14 } } },
        yaxis: { title: { text: 'Y AXIS TITLE', font: { size: 14 } } },
        zaxis: { title: { text: 'Z AXIS TITLE', font: { size: 14 } } },
        camera: { eye: { x: 1.7, y: 1.7, z: 0.8 } },
      },
    },
    stage.config,
  );
  if (stage.bar) {
    slider(stage.bar, 'title font size', [8, 30, 1], 14, (s) => void Plotly.relayout(stage.div, { 'scene.xaxis.title.font.size': s, 'scene.yaxis.title.font.size': s, 'scene.zaxis.title.font.size': s }));
  } else {
    stage.every(120, (i) => void Plotly.relayout(stage.div, { 'scene.camera.eye': { x: 2 * Math.cos(i / 25 + 0.8), y: 2 * Math.sin(i / 25 + 0.8), z: 0.8 } }));
  }
  return () => stage.dispose();
};

export default mount;
