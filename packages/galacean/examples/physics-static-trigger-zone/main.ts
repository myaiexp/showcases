// A static trigger zone: onTriggerEnter, onTriggerStay and onTriggerExit
import { BlinnPhongMaterial, type ColliderShape, MeshRenderer, Script, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { eventLog } from '../../shared/core-ui.ts';
import { lin } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rounds, wall, world } from '../../shared/phys-kit.ts';
import type { Stage } from '../../shared/stage.ts';

let log: (m: string) => void = () => {};

class Zone extends Script {
  stay = 0;
  override onTriggerEnter(other: ColliderShape): void {
    this.stay = 0;
    this.glow(true);
    log(`onTriggerEnter  ${other.collider.entity.name}`);
  }
  override onTriggerStay(): void {
    this.stay++;
  }
  override onTriggerExit(other: ColliderShape): void {
    this.glow(false);
    log(`onTriggerExit   ${other.collider.entity.name} (${this.stay} stay frames)`);
  }
  private glow(on: boolean): void {
    const m = this.entity.getComponent(MeshRenderer)!.getMaterial() as BlinnPhongMaterial;
    m.baseColor.set(...lin(on ? [1, 0.9, 0.3] : [0.2, 0.7, 0.4]), 1);
  }
}

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.2, 10], target: [0, 2, 0], hint: 'The zone is a static trigger: nothing collides with it, everything is reported.' });
  const stage: Stage = w.stage;
  const events = eventLog(stage, 6, 'tr');
  log = (m) => events.log(m);
  stage.own(() => (log = () => {}));
  const zone = wall(w.root, [0, 2.2, 0], [3, 2, 3], PALETTE.green, 'zone');
  zone.shape.isTrigger = true;
  zone.entity.addComponent(Zone);
  (zone.entity.getComponent(MeshRenderer)!.getMaterial() as BlinnPhongMaterial).baseColor.set(...lin([0.2, 0.7, 0.4]), 1);
  rounds(w, 3.2, (n, holder) => {
    const b = ball(holder, [-4, 1.2, 0], 0.4, PALETTE.amber, `ball ${n + 1}`);
    b.body.linearVelocity = new Vector3(3.2, 6.5, 0);
    b.shape.material.bounciness = 0.7;
  });
  w.say('StaticCollider + BoxColliderShape(isTrigger = true)');
  return stage.dispose;
};

export default mount;
