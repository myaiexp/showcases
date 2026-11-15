// The quick start in code: camera, light, cube and a rotating Script
import { BlinnPhongMaterial, DirectLight, MeshRenderer, PrimitiveMesh, Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { addCamera, createStage } from '../../shared/stage.ts';

// The quick start's script: one line in onUpdate turns the entity a degree a frame.
class Spin extends Script {
  override onUpdate(_deltaTime: number): void {
    this.entity.transform.rotate(0, 1, 0);
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'A Script component rotates the cube in onUpdate.' });
  const { engine, root } = stage;

  addCamera(root, [0, 2, 5]);

  const light = root.createChild('light');
  light.transform.setRotation(-45, -45, 0);
  light.addComponent(DirectLight);

  const cube = root.createChild('cube');
  cube.transform.setRotation(20, 0, 0);
  const renderer = cube.addComponent(MeshRenderer);
  renderer.mesh = PrimitiveMesh.createCuboid(engine, 1.6, 1.6, 1.6);
  const material = new BlinnPhongMaterial(engine);
  material.baseColor.set(0.9, 0.35, 0.1, 1);
  renderer.setMaterial(material);
  cube.addComponent(Spin);

  return stage.dispose;
};

export default mount;
