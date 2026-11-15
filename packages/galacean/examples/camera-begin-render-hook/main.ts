// Camera scripts get onBeginRender and onEndRender once per render of that camera
import { type Camera, Camera as CameraComponent, PrimitiveMesh, Script, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, spin } from '../../shared/gfx-kit.ts';

class Tint extends Script {
  color: [number, number, number] = [1, 1, 1];
  material!: ReturnType<typeof pbr>;
  count = 0;
  override onBeginRender(_camera: Camera): void {
    this.material.baseColor.set(...this.color, 1);
    this.count++;
  }
}

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1.5, 6], hint: 'One PBRMaterial; each camera sets its baseColor in onBeginRender.' });
  const say = caption(stage);
  const material = pbr(engine, [1, 1, 1], 0, 0.4);
  spin(add(root, PrimitiveMesh.createCuboid(engine, 2, 2, 2), material).entity, [20, 40, 0]);
  const e = root.createChild('right camera');
  e.transform.setPosition(0, 1.5, 6);
  e.transform.lookAt(camera.entity.transform.position.clone().set(0, 0, 0));
  const right = e.addComponent(CameraComponent);
  camera.viewport = new Vector4(0, 0, 0.5, 1);
  right.viewport = new Vector4(0.5, 0, 0.5, 1);
  const tints = [camera.entity.addComponent(Tint), e.addComponent(Tint)];
  tints[0]!.color = [0.95, 0.4, 0.3];
  tints[1]!.color = [0.3, 0.6, 0.95];
  for (const t of tints) t.material = material;
  const timer = root.createChild('counter');
  timer.addComponent(class extends Script {
    override onUpdate(): void {
      say(`onBeginRender calls: left ${tints[0]!.count}, right ${tints[1]!.count}`);
    }
  });
  return stage.dispose;
};

export default mount;
