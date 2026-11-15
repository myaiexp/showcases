// AmbientOcclusion intensity, power, radius, bias, bilateralThreshold, minHorizonAngle
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, tick } from '../../shared/gfx-kit.ts';
import { loadStudioEnv } from '../../shared/env.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [3, 3, 5], target: [0, 0.6, 0], light: false, hint: 'Docs ranges: radius 0.1-10 m, bias 0-0.5 m, minHorizonAngle 0-45°.' });
  const say = caption(stage);
  stage.scene.ambientLight = await loadStudioEnv(engine);
  add(root, PrimitiveMesh.createPlane(engine, 14, 14), pbr(engine, [0.8, 0.8, 0.8], 0, 0.95), [0, 0, 0], 'floor');
  for (const [x, y, z, s] of [[0, 0.5, 0, 1], [1.05, 0.35, 0.2, 0.7], [-0.2, 1.4, 0.1, 0.8], [-1.4, 0.3, 0.9, 0.6]] as const) add(root, PrimitiveMesh.createCuboid(engine, s, s, s), pbr(engine, [0.85, 0.85, 0.85], 0, 0.9), [x, y, z], 'box');
  const ao = stage.scene.ambientOcclusion;
  ao.enabled = true;
  const show = (): void => say(`radius ${ao.radius.toFixed(2)}  intensity ${ao.intensity.toFixed(2)}  power ${ao.power.toFixed(2)}`);
  if (stage.preview) {
    tick(root, (_dt, t) => {
      ao.radius = 0.2 + 1.4 * (0.5 + 0.5 * Math.sin(t * 0.7));
      ao.intensity = 1 + 1.5 * (0.5 + 0.5 * Math.sin(t * 0.7));
      show();
    });
  } else {
    const bind = (label: string, min: number, max: number, step: number, key: 'intensity' | 'power' | 'radius' | 'bias' | 'bilateralThreshold'): void => {
      slider(stage.bar, label, min, max, step, ao[key], (v) => ((ao[key] = v), show()));
    };
    bind('intensity', 0, 4, 0.05, 'intensity');
    bind('power', 0.1, 4, 0.05, 'power');
    bind('radius', 0.1, 10, 0.05, 'radius');
    bind('bias', 0, 0.5, 0.001, 'bias');
    bind('bilateralThreshold', 0, 1, 0.01, 'bilateralThreshold');
    slider(stage.bar, 'minHorizonAngle', 0, 45, 1, ao.minHorizonAngle, (v) => ((ao.minHorizonAngle = v), show()), (v) => `${v}°`);
    show();
  }
  return stage.dispose;
};

export default mount;
