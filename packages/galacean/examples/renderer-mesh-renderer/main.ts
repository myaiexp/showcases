// MeshRenderer: set mesh and material; one mesh can serve several renderers
import { BlinnPhongMaterial, MeshRenderer, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { demo, floor, spin } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 2, 6], hint: 'Two renderers share one mesh but each has its own material.' });
  floor(root, engine, -1.2);
  const mesh = PrimitiveMesh.createCuboid(engine, 1.6, 1.6, 1.6);
  const cubeEntity = root.createChild('cube');
  cubeEntity.transform.setPosition(-1.4, 0, 0);
  const cube = cubeEntity.addComponent(MeshRenderer);
  cube.mesh = mesh;
  cube.setMaterial(new BlinnPhongMaterial(engine));
  const other = root.createChild('cube 2');
  other.transform.setPosition(1.4, 0, 0);
  const second = other.addComponent(MeshRenderer);
  second.mesh = mesh;
  const material = new BlinnPhongMaterial(engine);
  material.baseColor.set(0.2, 0.5, 0.9, 1);
  second.setMaterial(material);
  spin(cubeEntity, [15, 30, 0]);
  spin(other, [15, -30, 0]);
  return stage.dispose;
};

export default mount;
