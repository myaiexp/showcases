// scene.shadowCascades and the cascade split ratios for a long scene
import { PrimitiveMesh, ShadowCascadesMode, ShadowResolution, ShadowType, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, floor, steps } from '../../shared/gfx-kit.ts';
import { select, slider } from '../../shared/controls.ts';

const NAMES = ['NoCascades', 'TwoCascades', 'FourCascades'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, light } = await demo(el, ctx, { camera: [0, 2.4, 4], target: [0, 1, -20] });
  const say = caption(stage);
  floor(root, engine, 0, 90, blinn(engine, [0.62, 0.64, 0.7], 6));
  for (let i = 0; i < 16; i++) {
    for (const side of [-1, 1]) add(root, PrimitiveMesh.createCylinder(engine, 0.35, 0.35, 2.4, 16), blinn(engine, [0.9, 0.7 - i * 0.02, 0.4], 30), [side * 2.2, 1.2, -i * 3.5], 'pillar');
  }
  light.entity.transform.setRotation(-35, -50, 0);
  light.shadowType = ShadowType.Hard;
  const { scene } = stage;
  scene.shadowResolution = ShadowResolution.Low;
  scene.shadowDistance = 60;
  const apply = (n: (typeof NAMES)[number]): void => {
    scene.shadowCascades = ShadowCascadesMode[n];
    say(`shadowCascades = ${n}  (resolution Low, distance 60)`);
  };
  if (stage.preview) steps(root, 2.4, NAMES.length, (i) => apply(NAMES[i]!));
  else {
    apply('NoCascades');
    select(stage.bar, 'shadowCascades', NAMES, apply);
    slider(stage.bar, 'two-cascade split', 0.05, 0.95, 0.01, scene.shadowTwoCascadeSplits, (v) => (scene.shadowTwoCascadeSplits = v));
    const four = new Vector3().copyFrom(scene.shadowFourCascadeSplits);
    (['x', 'y', 'z'] as const).forEach((k) => slider(stage.bar, `four split ${k}`, 0.02, 0.98, 0.01, four[k], (v) => ((four[k] = v), (scene.shadowFourCascadeSplits = four))));
  }
  return stage.dispose;
};

export default mount;
