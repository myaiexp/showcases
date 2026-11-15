// onCollisionEnter, onCollisionStay and onCollisionExit on a ball bouncing on a floor
import { type Collision, DynamicCollider, PrimitiveMesh, Script, StaticCollider, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { boxShape, lit, PALETTE, phong, sphereShape, solid, tick } from '../../shared/core-kit.ts';
import { eventLog, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

let sink: (m: string) => void = () => {};

class Ball extends Script {
  stays = 0;
  override onCollisionEnter(other: Collision): void {
    this.stays = 0;
    sink(`onCollisionEnter  contacts ${other.contactCount}  with ${other.shape.collider.entity.name}`);
  }
  override onCollisionStay(): void {
    this.stays++;
  }
  override onCollisionExit(): void {
    sink(`onCollisionExit   (stayed ${this.stays} frames)`);
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { physics: true, hint: 'The ball is kicked into the air every 2.5 seconds; the log lists each landing and take-off.' });
  const { engine, root } = stage;
  lit(stage, [0, 3, 10], [0, 2, 0]);
  const log = eventLog(stage, 8, 'tr');
  sink = (m) => log.log(m);
  stage.own(() => (sink = () => {}));
  const floor = solid(root, PrimitiveMesh.createCuboid(engine, 10, 0.4, 5), phong(engine, PALETTE.grey), [0, -0.2, 0], 'floor');
  const floorBody = floor.addComponent(StaticCollider);
  floorBody.addShape(boxShape(10, 0.4, 5));
  const ball = solid(root, PrimitiveMesh.createSphere(engine, 0.6, 24), phong(engine, PALETTE.amber), [0, 3, 0], 'ball');
  const body = ball.addComponent(DynamicCollider);
  body.addShape(sphereShape(0.6));
  const script = ball.addComponent(Ball);
  const info = panel(stage, 'bl');
  const kick = (): void => {
    body.wakeUp();
    body.linearVelocity = new Vector3(-ball.transform.position.x * 0.6 + (Math.random() - 0.5), 6, 0);
  };
  if (!stage.preview) button(stage.bar, 'Kick the ball', kick);
  let last = 0;
  tick(root, (_dt, t) => {
    if (t - last > 2.5) {
      last = t;
      kick();
    }
    info.text(`onCollisionStay frames this contact: ${script.stays}`);
  });
  return stage.dispose;
};

export default mount;
