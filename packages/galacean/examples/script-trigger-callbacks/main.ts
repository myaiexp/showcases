// onTriggerEnter, onTriggerStay and onTriggerExit as a kinematic ball crosses a trigger zone
import { DynamicCollider, PrimitiveMesh, Script, StaticCollider, type ColliderShape } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { boxShape, lit, PALETTE, sphereShape, solid, tick, unlit } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

class Zone extends Script {
  enters = 0;
  stays = 0;
  exits = 0;
  inside = false;
  override onTriggerEnter(_other: ColliderShape): void {
    this.enters++;
    this.inside = true;
  }
  override onTriggerStay(): void {
    this.stays++;
  }
  override onTriggerExit(): void {
    this.exits++;
    this.inside = false;
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { physics: true, hint: 'The zone is a StaticCollider whose shape has isTrigger = true; the ball is a kinematic DynamicCollider.' });
  const { engine, root } = stage;
  lit(stage, [0, 3, 10]);
  const zoneMat = unlit(engine, PALETTE.cyan, 0.3);
  const zoneEntity = solid(root, PrimitiveMesh.createCuboid(engine, 3, 2.4, 2.4), zoneMat, [0, 0, 0], 'zone');
  zoneEntity.addComponent(StaticCollider).addShape(boxShape(3, 2.4, 2.4, true));
  const zone = zoneEntity.addComponent(Zone);
  const ball = solid(root, PrimitiveMesh.createSphere(engine, 0.5, 20), unlit(engine, PALETTE.amber), [-6, 0, 0], 'ball');
  const body = ball.addComponent(DynamicCollider);
  body.isKinematic = true;
  body.addShape(sphereShape(0.5));
  const info = panel(stage);
  tick(root, (_dt, t) => {
    const x = Math.sin(t * 0.8) * 5.5;
    ball.transform.setPosition(x, 0, 0);
    zoneMat.baseColor.set(zone.inside ? 1 : 0.3, zone.inside ? 0.75 : 0.85, zone.inside ? 0.25 : 0.9, 0.3);
    info.text(`onTriggerEnter ${zone.enters}\nonTriggerStay  ${zone.stays}\nonTriggerExit  ${zone.exits}\ninside: ${zone.inside}`);
  });
  return stage.dispose;
};

export default mount;
