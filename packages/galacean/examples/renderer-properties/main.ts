// Renderer's properties read back from getComponent(Renderer)
import { MeshRenderer, PrimitiveMesh, Renderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { blinn, caption, demo, floor, spin, tick } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 2, 8], target: [0, 0, 0] });
  const say = caption(stage);
  floor(root, engine, -1);
  const cubeEntity = root.createChild('cube');
  const cube = cubeEntity.addComponent(MeshRenderer);
  cube.mesh = PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4);
  cube.setMaterial(blinn(engine, [0.4, 0.65, 0.95], 40));
  spin(cubeEntity, [10, 30, 0]);
  const renderer = cubeEntity.getComponent(Renderer)!;
  renderer.priority = 1;
  tick(cubeEntity, (_dt, t) => {
    cubeEntity.transform.setPosition(Math.sin(t * 0.5) * 9, 0, 0);
    const b = renderer.bounds;
    say(
      `castShadows ${renderer.castShadows}   receiveShadows ${renderer.receiveShadows}   priority ${renderer.priority}\nmaterialCount ${renderer.materialCount}   isCulled ${renderer.isCulled}\nbounds.min.x ${b.min.x.toFixed(1)}   bounds.max.x ${b.max.x.toFixed(1)}`,
    );
  });
  stage.own(() => cube.mesh.destroy());
  return stage.dispose;
};

export default mount;
