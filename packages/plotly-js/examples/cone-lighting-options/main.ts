// Eight columns of cones, each with a different lighting or lightposition setting
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { margin3d } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const VARIANTS: { name: string; extra: Record<string, unknown> }[] = [
  { name: 'base', extra: {} },
  { name: 'opacity:0.3', extra: { opacity: 0.3 } },
  { name: 'lighting.ambient:0.3', extra: { lighting: { ambient: 0.3 } } },
  { name: 'lighting.diffuse:0.3', extra: { lighting: { diffuse: 0.3 } } },
  { name: 'lighting.specular:2', extra: { lighting: { specular: 2 } } },
  { name: 'lighting.roughness:1', extra: { lighting: { roughness: 1 } } },
  { name: 'lighting.fresnel:2', extra: { lighting: { fresnel: 2 } } },
  { name: 'lighting.position x:0,y:0,z:1e5', extra: { lightposition: { x: 0, y: 0, z: 1e5 } } },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const data = VARIANTS.map(
    (v, n) =>
      ({
        type: 'cone',
        name: v.name,
        x: [n + 1, n + 1, n + 1],
        y: [1, 2, 3],
        z: [1, 1, 1],
        u: [1, 2, 3],
        v: [1, 1, 2],
        w: [4, 4, 1],
        hoverinfo: 'u+v+w+name',
        showscale: false,
        ...v.extra,
      }) as Data,
  );
  await Plotly.newPlot(
    stage.div,
    data,
    { template: stage.template, margin: margin3d(stage), scene: { aspectmode: 'data', camera: { eye: { x: 0.05, y: -2.6, z: 2 } } } },
    stage.config,
  );
  // The card swings the camera back and forth so the highlights move across the cones.
  if (stage.preview) {
    stage.every(90, (i) => {
      const a = -1.57 + 0.6 * Math.sin(i / 14);
      void relayout(stage.div, { 'scene.camera.eye': { x: 2.8 * Math.cos(a), y: 2.8 * Math.sin(a), z: 1.8 } });
    });
  }
  return () => stage.dispose();
};

export default mount;
