// AmbientOcclusion.quality: Low, Medium, High
import { AmbientOcclusionQuality, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, steps } from '../../shared/gfx-kit.ts';
import { loadStudioEnv } from '../../shared/env.ts';
import { select } from '../../shared/controls.ts';

const NAMES = ['Low', 'Medium', 'High'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [2.5, 2.5, 4], target: [0, 0.5, 0], light: false });
  const say = caption(stage);
  stage.scene.ambientLight = await loadStudioEnv(engine);
  add(root, PrimitiveMesh.createPlane(engine, 12, 12), pbr(engine, [0.8, 0.8, 0.8], 0, 0.95), [0, 0, 0], 'floor');
  for (const [x, y, z, s] of [[0, 0.5, 0, 1], [1.05, 0.35, 0.2, 0.7], [-0.2, 1.4, 0.1, 0.8], [-1.2, 0.3, 0.9, 0.6]] as const) add(root, PrimitiveMesh.createCuboid(engine, s, s, s), pbr(engine, [0.85, 0.85, 0.85], 0, 0.9), [x, y, z], 'box');
  const ao = stage.scene.ambientOcclusion;
  ao.enabled = true;
  ao.intensity = 2;
  const apply = (n: (typeof NAMES)[number]): void => {
    ao.quality = AmbientOcclusionQuality[n];
    say(`ambientOcclusion.quality = ${n}`);
  };
  if (stage.preview) steps(root, 2.2, NAMES.length, (i) => apply(NAMES[i]!));
  else {
    apply('Medium');
    select(stage.bar, 'quality', NAMES, apply, 'Medium');
  }
  return stage.dispose;
};

export default mount;
