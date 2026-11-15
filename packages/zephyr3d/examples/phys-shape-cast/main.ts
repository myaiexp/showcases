// shapeCast: sweep a shape along a direction and stop where it first touches
import { Quaternion, Vector3 } from '@zephyr3d/base';
import { BoxShape, Mesh, SphereShape } from '@zephyr3d/scene';
import type { PhysicsShape } from '@zephyr3d/scene';
import { select } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { beam, capsuleShape, cylinderShape, floor, launch, marker, mat, orbit, ORANGE, SLATE, startPhysics, staticBox, YELLOW } from '../../shared/phys-kit.ts';

type Kind = 'sphere' | 'box' | 'capsule' | 'cylinder';
const KINDS: readonly Kind[] = ['sphere', 'box', 'capsule', 'cylinder'];

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 18, 14);
  const readout = stage.readout();

  // A ring of pillars of different widths to sweep towards
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2 + 0.2;
    const w = 0.8 + (i % 3) * 0.4;
    staticBox(kit, new Vector3(w, 2.4, w), new Vector3(Math.cos(a) * 5, 1.2, Math.sin(a) * 5), SLATE);
  }

  // The shape being swept, and a ghost of it where it stopped
  const shapes: Record<Kind, { query: PhysicsShape; mesh: () => Mesh }> = {
    sphere: { query: { type: 'sphere', radius: 0.6 }, mesh: () => new Mesh(kit.scene, new SphereShape({ radius: 0.6 }), mat(YELLOW, 0.5)) },
    box: { query: { type: 'box', size: new Vector3(1.2, 1.2, 1.2) }, mesh: () => new Mesh(kit.scene, new BoxShape({ size: 1.2 }), mat(YELLOW, 0.5)) },
    capsule: { query: { type: 'capsule', radius: 0.4, height: 1.8 }, mesh: () => new Mesh(kit.scene, capsuleShape(0.4, 1.8), mat(YELLOW, 0.5)) },
    cylinder: { query: { type: 'cylinder', radius: 0.6, height: 1.2 }, mesh: () => new Mesh(kit.scene, cylinderShape(0.6, 1.2), mat(YELLOW, 0.5)) },
  };
  const ghosts = {} as Record<Kind, Mesh>;
  for (const k of KINDS) {
    ghosts[k] = shapes[k].mesh();
    ghosts[k].castShadow = false;
  }
  const start = new Vector3(0, 1.2, 0);
  const ray = beam(kit, ORANGE, 0.04);
  const contact = marker(kit, 0.1, ORANGE);
  let kind: Kind = 'sphere';
  const identity = Quaternion.identity();
  let t = 0;
  kit.myApp.on('tick', (dtMs: number) => {
    t += dtMs / 1000;
    const angle = t * 0.5;
    const dir = new Vector3(Math.cos(angle), 0, Math.sin(angle));
    const reach = 8;
    // Sweeps from the middle outwards; `distance` is how far the shape's centre got
    const hit = kit.world.shapeCast(shapes[kind].query, start, identity, dir, reach);
    const travelled = hit ? hit.distance : reach;
    const stop = Vector3.add(start, Vector3.scale(dir, travelled), new Vector3());
    ray.set(start, stop);
    for (const k of KINDS) {
      ghosts[k].showState = k === kind ? 'visible' : 'hidden';
    }
    ghosts[kind].position.set(stop);
    contact.showState = hit ? 'visible' : 'hidden';
    if (hit) contact.position.set(hit.point);
    const text = hit ? `${kind} stopped after ${hit.distance.toFixed(2)} m against ${hit.node.name || 'a pillar'}` : `${kind}: nothing in ${reach} m`;
    stage.caption(text);
    if (readout) readout.textContent = text;
  });

  if (stage.bar) select(stage.bar, 'Shape', KINDS, kind, (v) => (kind = v));
  else stage.every(4000, (i) => (kind = KINDS[i % KINDS.length]!));

  orbit(kit, new Vector3(0, 11, 9), new Vector3(0, 0, 0));
  launch(kit);
});
