// layout.scene.annotations: text and arrows tied to x, y, z of a 3D scene
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  const empty = { title: { text: '' } };
  const light = '#e6e8ee';

  await Plotly.newPlot(
    stage.div,
    [{ type: 'scatter3d', x: ['2017-01-01', '2017-02-10', '2017-03-20'], y: ['A', 'B', 'C'], z: [1, 1e3, 1e5], marker: { size: 5 } }],
    {
      template: stage.template,
      scene: {
        camera: { eye: { x: 2.1, y: 0.1, z: 0.9 } },
        xaxis: { ...empty },
        yaxis: { ...empty },
        zaxis: { type: 'log', ...empty },
        annotations: [
          { showarrow: false, x: '2017-01-01', y: 'A', z: 0, text: 'Point 1', font: { color: light, size: 12 }, xanchor: 'left', xshift: 10, opacity: 0.8 },
          { x: '2017-02-10', y: 'B', z: 4, text: 'Point 2', textangle: 0, ax: 0, ay: -75, font: { color: light, size: 12 }, arrowcolor: light, arrowsize: 3, arrowwidth: 1, arrowhead: 1 },
          { x: '2017-03-20', y: 'C', z: 5, ax: 50, ay: 0, text: 'Point 3', arrowhead: 1, xanchor: 'left', yanchor: 'bottom', font: { color: light } },
        ],
      },
    } as unknown as Partial<Layout>,
    stage.config,
  );
  const turn = (deg: number): Promise<void> => {
    const a = (deg * Math.PI) / 180;
    return relayout(stage.div, { 'scene.camera.eye': { x: 2.1 * Math.cos(a) + 0.1 * Math.sin(a), y: 2.1 * Math.sin(a) + 0.1, z: 0.9 } });
  };
  if (stage.bar) slider(stage.bar, 'camera angle', [-90, 90, 5], 0, (v) => void turn(v));
  if (stage.preview) stage.every(80, (i) => void turn(Math.sin(i / 20) * 60));
  return () => stage.dispose();
};

export default mount;
