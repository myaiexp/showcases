// ColliderShape.isTrigger: solid blocks stop balls, triggers only report them
import { BlinnPhongMaterial, type ColliderShape, MeshRenderer, Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { lin } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rain, rnd, wall, world } from '../../shared/phys-kit.ts';

class Flash extends Script {
  override onTriggerEnter(_other: ColliderShape): void {
    this.set(true);
  }
  override onTriggerExit(_other: ColliderShape): void {
    this.set(false);
  }
  private set(on: boolean): void {
    const m = this.entity.getComponent(MeshRenderer)!.getMaterial() as BlinnPhongMaterial;
    if (on) m.baseColor.set(1, 1, 1, 1);
    else m.baseColor.set(...lin([...PALETTE.amber]), 1);
  }
}

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.5, 10], target: [0, 1.8, 0], hint: 'Tick "trigger" to turn the left block into a trigger as well.' });
  const solid = wall(w.root, [-2.5, 1.5, 0], [3, 1, 3], PALETTE.blue, 'solid block');
  const zone = wall(w.root, [2.5, 1.5, 0], [3, 1, 3], PALETTE.green, 'trigger block');
  zone.shape.isTrigger = true;
  rain(w, 0.8, 6, (n, parent) => {
    const b = ball(parent, [(n % 2 ? 2.5 : -2.5) + rnd(n) * 0.8, 6, 0], 0.4, PALETTE.amber);
    b.shape.material.bounciness = 0.5;
    b.entity.addComponent(Flash);
    return b.entity;
  });
  if (!w.stage.preview) checkbox(w.stage.bar, 'trigger on the left block too', false, (v) => (solid.shape.isTrigger = v));
  w.say('left: isTrigger = false    right: isTrigger = true');
  return w.stage.dispose;
};

export default mount;
