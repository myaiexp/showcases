// setMaterial(index, material): a different material for each sub-mesh
import { BlinnPhongMaterial, MeshRenderer, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { blinn, caption, demo, spin, steps } from '../../shared/gfx-kit.ts';
import { button } from '../../shared/controls.ts';

const FACES = [[0.9, 0.35, 0.3], [0.95, 0.7, 0.25], [0.45, 0.8, 0.4], [0.3, 0.75, 0.8], [0.4, 0.5, 0.95], [0.75, 0.4, 0.9]] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [3, 3, 5], target: [0, 0, 0] });
  const say = caption(stage);
  const mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2);
  mesh.clearSubMesh();
  for (let i = 0; i < 6; i++) mesh.addSubMesh(i * 6, 6);
  const entity = root.createChild('cube');
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = mesh;
  FACES.forEach((c, i) => renderer.setMaterial(i, blinn(engine, [...c], 40)));
  spin(entity, [10, 25, 0]);
  const swap = (face: number): void => {
    const m = new BlinnPhongMaterial(engine);
    const grey = 0.9 - 0.4 * ((face + 1) % 2);
    m.baseColor.set(grey, grey, grey, 1);
    renderer.setMaterial(face, m);
    say(`setMaterial(${face}, grey)   materialCount ${renderer.materialCount}, getMaterials() ${renderer.getMaterials().length}`);
  };
  if (stage.preview) steps(entity, 1.4, 12, (i) => (i < 6 ? swap(i) : FACES.forEach((c, k) => renderer.setMaterial(k, blinn(engine, [...c], 40)))));
  else {
    say(`materialCount ${renderer.materialCount}`);
    FACES.forEach((_c, i) => button(stage.bar, `face ${i}`, () => swap(i)));
  }
  stage.own(() => mesh.destroy());
  return stage.dispose;
};

export default mount;
