// Camera.msaaSamples smooths edges when post-processing is on
import { MSAASamples, PBRMaterial, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, lin, steps, tick } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const NAMES = ['None', 'TwoX', 'FourX', 'EightX'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await postDemo(el, ctx, { glow: false, hdr: false, camera: [0, 0, 5], target: [0, 0, 0], hint: 'MSAASamples.None, TwoX, FourX, EightX.' });
  const say = caption(stage);
  const m = new PBRMaterial(engine);
  m.baseColor.set(...lin([0.95, 0.85, 0.5]), 1);
  m.metallic = 0;
  m.roughness = 0.5;
  const bars = [0, 1, 2, 3, 4].map((i) => add(root, PrimitiveMesh.createCuboid(engine, 0.06, 3.2, 0.06), m, [(i - 2) * 0.55, 0, 0]).entity);
  tick(root, (_dt, t) => bars.forEach((b, i) => b.transform.setRotation(0, 0, t * 6 + i * 4)));
  const set = (name: (typeof NAMES)[number]): void => {
    camera.msaaSamples = MSAASamples[name];
    say(`msaaSamples = MSAASamples.${name}`);
  };
  if (stage.preview) steps(root, 2.2, NAMES.length, (i) => set(NAMES[i]!));
  else {
    set('None');
    select(stage.bar, 'msaaSamples', NAMES, set);
  }
  return stage.dispose;
};

export default mount;
