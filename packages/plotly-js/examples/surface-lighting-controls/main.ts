// surface.lighting: ambient, diffuse, specular, roughness and fresnel on one saddle surface
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { saddle } from '../../shared/fund-util.ts';

const KEYS = [
  ['ambient', 0.8],
  ['diffuse', 0.8],
  ['specular', 0.05],
  ['roughness', 0.5],
  ['fresnel', 0.2],
] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  await Plotly.newPlot(
    stage.div,
    [{ type: 'surface', z: saddle(60), colorscale: 'Viridis', showscale: false, lighting: Object.fromEntries(KEYS) }],
    { template: stage.template, margin: { l: 0, r: 0, t: 0, b: 0 }, scene: { aspectmode: 'cube', camera: { eye: { x: 1.5, y: 1.5, z: 0.8 } } } },
    stage.config,
  );

  if (stage.bar) {
    for (const [key, v] of KEYS) {
      slider(stage.bar, key, [0, 1, 0.05], v, (x) => void Plotly.restyle(stage.div, { [`lighting.${key}`]: x }));
    }
  } else {
    // Specular and roughness change how the highlight sits on the saddle as the view turns.
    stage.every(120, (i) => {
      void Plotly.update(
        stage.div,
        { 'lighting.specular': 0.5 + 0.5 * Math.sin(i / 12), 'lighting.ambient': 0.5 + 0.4 * Math.cos(i / 20) },
        { 'scene.camera.eye': { x: 2 * Math.cos(i / 40 + 0.8), y: 2 * Math.sin(i / 40 + 0.8), z: 0.8 } },
      );
    });
  }
  return () => stage.dispose();
};

export default mount;
