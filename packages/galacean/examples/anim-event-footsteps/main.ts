// Events on a loaded clip: the Walk cycle calls step() twice per loop and a footprint appears
import { type Entity, PrimitiveMesh, Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, clipOf, rig } from '../../shared/model-kit.ts';

class Walker extends Script {
  prints: { entity: Entity; age: number }[] = [];
  make!: (x: number, z: number) => Entity;
  distance = 0;
  step(foot: 'L' | 'R'): void {
    this.prints.push({ entity: this.make(foot === 'L' ? -0.25 : 0.25, this.distance), age: 0 });
  }
  override onUpdate(dt: number): void {
    this.distance -= dt * 1.4;
    if (this.distance < -5) this.distance = 0;
    this.entity.transform.setPosition(0, 0, this.distance);
    for (const p of this.prints) {
      p.age += dt;
      const s = Math.max(0.01, 1 - p.age / 2.5);
      p.entity.transform.setScale(s, 1, s);
    }
    while (this.prints.length && this.prints[0]!.age > 2.5) this.prints.shift()!.entity.destroy();
  }
}

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb, { camera: [3.5, 3, 4], target: [0, 0.8, -1] });
  if (!r) return NOOP;
  const { stage, engine, root, gltf, animator, model, camera, say } = r;
  const walk = clipOf(gltf, 'Walk');
  // Leg swing peaks at 0.25 s and 0.75 s of the 1 s clip: the left then the right foot lands.
  walk.addEvent('step', 0.25, 'L');
  walk.addEvent('step', 0.75, 'R');
  stage.own(() => walk.clearEvents());
  const walker = model.addComponent(Walker);
  const mesh = PrimitiveMesh.createCylinder(engine, 0.18, 0.18, 0.02, 16);
  const material = blinn(engine, [0.95, 0.75, 0.3]);
  walker.make = (x, z) => add(root, mesh, material, [x, 0.02, z + 0.1], 'print').entity;
  animator.play('Walk');
  tick(camera.entity, () => {
    camera.entity.transform.setPosition(3.5, 3, walker.distance + 5);
    camera.entity.transform.lookAt(camera.entity.transform.position.clone().set(0, 0.8, walker.distance - 1));
    say(`Walk events: ${walk.events.map((e) => `${e.functionName}("${String(e.parameter)}")@${e.time}`).join(', ')}`);
  });
  return stage.dispose;
};

export default mount;
