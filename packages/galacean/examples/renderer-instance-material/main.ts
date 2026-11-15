// getMaterial edits the shared material, getInstanceMaterial makes a private copy
import { BlinnPhongMaterial, MeshRenderer, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { blinn, caption, demo, floor, spin, steps } from '../../shared/gfx-kit.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 2, 6] });
  const say = caption(stage);
  floor(root, engine, -1.2);
  const mesh = PrimitiveMesh.createCuboid(engine, 1.5, 1.5, 1.5);
  const shared = blinn(engine, [0.6, 0.6, 0.6], 40);
  const cubes = [-1.4, 1.4].map((x) => {
    const entity = root.createChild('cube');
    entity.transform.setPosition(x, 0, 0);
    const r = entity.addComponent(MeshRenderer);
    r.mesh = mesh;
    r.setMaterial(shared);
    spin(entity, [10, x * 10, 0]);
    return r;
  });
  const paint = (instance: boolean, hue: number): void => {
    const m = (instance ? cubes[0]!.getInstanceMaterial() : cubes[0]!.getMaterial()) as BlinnPhongMaterial;
    m.baseColor.set(0.5 + 0.5 * Math.cos(hue), 0.5 + 0.5 * Math.cos(hue + 2.1), 0.5 + 0.5 * Math.cos(hue + 4.2), 1);
    say(instance ? 'left.getInstanceMaterial(): only the left cube changes' : 'left.getMaterial(): the shared material, both change');
  };
  if (stage.preview) steps(root, 2.2, 4, (i) => paint(i % 2 === 1, i * 1.7));
  else {
    button(stage.bar, 'left.getMaterial() colour', () => paint(false, Math.random() * 6.28));
    button(stage.bar, 'left.getInstanceMaterial() colour', () => paint(true, Math.random() * 6.28));
  }
  stage.own(() => mesh.destroy());
  return stage.dispose;
};

export default mount;
