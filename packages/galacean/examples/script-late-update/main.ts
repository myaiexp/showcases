// A camera follows a ball from onLateUpdate, after every onUpdate has moved things
import { Camera, DirectLight, PrimitiveMesh, Script, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { PALETTE, phong, solid } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

class Mover extends Script {
  private t = 0;
  rotationY = 0;
  override onUpdate(dt: number): void {
    this.t += dt;
    this.entity.transform.setPosition(Math.sin(this.t * 0.8) * 5, 0.5 + Math.abs(Math.sin(this.t * 2.2)) * 1.4, Math.cos(this.t * 0.5) * 3);
    this.entity.transform.rotate(new Vector3(0, this.rotationY++, 0)); // the docs' accumulating angle
  }
  override onLateUpdate(): void {
    this.rotationY %= 360; // after all onUpdate calls, as in the docs
  }
}

class Follow extends Script {
  target?: Mover;
  private readonly offset = new Vector3(0, 2.4, 6);
  override onLateUpdate(): void {
    const p = this.target!.entity.transform.worldPosition;
    this.entity.transform.setPosition(p.x + this.offset.x, p.y + this.offset.y, p.z + this.offset.z);
    this.entity.transform.lookAt(p);
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The camera moves in onLateUpdate, so it always sees the ball where onUpdate left it.' });
  const { engine, root } = stage;
  stage.scene.ambientLight.diffuseSolidColor.set(0.4, 0.42, 0.48, 1);
  root.createChild('light').addComponent(DirectLight).entity.transform.setRotation(-45, -30, 0);
  const ball = solid(root, PrimitiveMesh.createCuboid(engine, 0.9, 0.9, 0.9), phong(engine, PALETTE.amber), [0, 0.5, 0], 'ball');
  const mover = ball.addComponent(Mover);
  for (let i = -3; i <= 3; i++) solid(root, PrimitiveMesh.createCylinder(engine, 0.25, 0.25, 0.2, 16), phong(engine, PALETTE.grey), [i * 2.2, -0.1, -2]);
  solid(root, PrimitiveMesh.createPlane(engine, 40, 40), phong(engine, [0.22, 0.25, 0.3]), [0, -0.2, 0]);
  const cameraEntity = root.createChild('camera');
  cameraEntity.addComponent(Camera);
  cameraEntity.addComponent(Follow).target = mover;
  const info = panel(stage, 'bl');
  const timer = setInterval(() => info.text(`rotationY (wrapped in onLateUpdate) ${mover.rotationY}`), 100);
  stage.own(() => clearInterval(timer));
  return stage.dispose;
};

export default mount;
