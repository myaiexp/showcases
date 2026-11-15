// camera.msaaSamples: None, TwoX, FourX (default), EightX
import { MSAASamples, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, spin, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';

const NAMES = ['None', 'TwoX', 'FourX', 'EightX'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0, 5] });
  const say = caption(stage);
  const wheel = root.createChild('wheel');
  for (let i = 0; i < 10; i++) {
    const spoke = add(wheel, PrimitiveMesh.createCuboid(engine, 0.07, 3.2, 0.07), blinn(engine, [0.9, 0.75, 0.4], 40), [0, 0, 0], 'spoke');
    spoke.entity.transform.setRotation(0, 0, i * 18);
  }
  add(wheel, PrimitiveMesh.createTorus(engine, 1.6, 0.04, 8, 64), blinn(engine, [0.4, 0.7, 0.95], 40), [0, 0, 0], 'rim');
  spin(wheel, [8, 0, 10]);
  const apply = (n: (typeof NAMES)[number]): void => {
    camera.msaaSamples = MSAASamples[n];
    say(`msaaSamples = MSAASamples.${n}`);
  };
  if (stage.preview) steps(root, 2, NAMES.length, (i) => apply(NAMES[i]!));
  else {
    apply('FourX');
    select(stage.bar, 'msaaSamples', NAMES, apply, 'FourX');
  }
  return stage.dispose;
};

export default mount;
